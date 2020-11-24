const Url = require('url');
const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');
const { verifyRequestSignature } = require('@slack/events-api');
const storage = require('./storage');
const Superagent = require('superagent');

module.exports = async (ctx) => {
  let url = Url.parse(ctx.url);
  let pathname = url.pathname.split('/');
  pathname.splice(0, 5);
  pathname = '/' + pathname.join('/');
  url.pathname = pathname;
  url = Url.format(url);

  Sdk.debug('NEW REQUEST', ctx.method, ctx.url);

  // Most requests go to the Settings Manager
  if (!pathname.startsWith('/events')) {
    return Sdk.createSettingsManager(configure)(ctx);
  } else {
    if (ctx.configuration.slack_signing_secret) {
      if (pathname.startsWith('/events/ingest') && ctx.method === 'POST') {
        return handleEventIngest(ctx);
      } else if (pathname.startsWith('/events/registration') && ctx.method === 'POST') {
        if (!ctx.caller.permissions) {
          return { status: 403 };
        }
        return registerCore(ctx);
      } else if (pathname.startsWith('/events/registration') && ctx.method === 'DELETE') {
        if (!ctx.caller.permissions) {
          return { status: 403 };
        }
        return registerCore(ctx, true);
      } else {
        return { status: 404 };
      }
    } else {
      return {
        status: 404,
        body: 'Connector is not configured for Slack Events API',
      };
    }
  }
};

async function handleEventIngest(ctx) {
  try {
    verifyRequestSignature({
      signingSecret: ctx.configuration.slack_signing_secret,
      requestSignature: ctx.headers['x-slack-signature'],
      requestTimestamp: parseInt(ctx.headers['x-slack-request-timestamp'], 10),

      // Slack escapes forward slashes in their body text as "\/"; this is stripped out during the JSON parsing.
      // Add it back in so that the signature is calculated correctly.
      body: JSON.stringify(ctx.body).replace(/\//g, '\\/'),
    });
  } catch (e) {
    Sdk.debug('New event signature verification failed');
    Sdk.debug(JSON.stringify(ctx.body));
    return { status: 403 };
  }

  Sdk.debug('New event signature verified');

  return ctx.query.dispatch !== undefined ? await dispatch(ctx) : await respondToSlack(ctx);
}

async function respondToSlack(ctx) {
  let slackTimestamp = +ctx.headers['x-slack-request-timestamp'] * 1000;
  Sdk.debug('Slack request time', slackTimestamp);

  // URL Verification Challenge
  if (ctx.body && ctx.body.type && ctx.body.type === 'url_verification') {
    Sdk.debug('URL Verification Challenge');
    return { body: { challenge: ctx.body.challenge } };
  }

  // Call back to itself to dispatch, wait 100ms, and confirm success to slack
  // The async dispatch can run beyond the Slack's 3s limit

  try {
    Superagent.post(ctx.baseUrl + '/events/ingest?dispatch')
      .set(ctx.headers)
      .send(ctx.body)
      .end();
  } catch (e) {
    // We silently eat errors here, have to look at realtime logs
    Sdk.debug('Dispatch request to self completed with error', error);
  }

  Sdk.debug('Dispatch request to self completed with success');

  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      Sdk.debug('Responded to Slack', Date.now());
      resolve({ status: 200 });
    }, 100);
  });
}

async function dispatch(ctx) {
  let body = ctx.body;

  // Route all other events
  if (body && body.api_app_id && body.team_id) {
    await storage.ensureCache(ctx);
    Sdk.debug('Event is for Team ID', body.api_app_id, body.team_id);
    const handlers = storage.teamToHandler[body.api_app_id][body.team_id];
    if (!handlers) {
      Sdk.debug('No handlers registered for this Team ID, not routing');
      return;
    }

    try {
      const promises = handlers.map((h) =>
        Superagent.post(h)
          .set('Authorization', `Bearer ${ctx.fusebit.functionAccessToken}`)
          .send(body.event)
          .ok((r) => {
            if (r.status >= 300) {
              Sdk.debug('Handler error', h, r.body);
            }
            return true;
          })
      );

      await Promise.all(promises);
      Sdk.debug(`Routed ${handlers.length} requests`);
    } catch (error) {
      Sdk.debug('Routing error', error);
    }
  } else {
    Sdk.debug('No App ID and Team ID provided with event, not routing');
    return;
  }
}

async function registerCore(ctx, isDeregister) {
  if (!ctx.caller.permissions) {
    return { status: 403 };
  }
  await storage.ensureCache(ctx);

  let team, app, handler;
  if (!isDeregister) {
    if (!ctx.body || !ctx.body.app || !ctx.body.team_id || !ctx.body.handler) {
      return {
        status: 400,
        body: { message: 'Missing required app, team_id, and handler body parameters' },
      };
    }
    team = ctx.body.team_id;
    app = ctx.body.app;
    handler = ctx.body.handler;
  } else {
    if (!ctx.query || !ctx.query.app || !ctx.query.team_id || !ctx.query.handler) {
      return {
        status: 400,
        body: { message: 'Missing required app, team_id, and handler query parameters' },
      };
    }
    team = ctx.query.team_id;
    app = ctx.query.app;
    handler = decodeURIComponent(ctx.query.handler);
  }

  await storage.put(ctx, () => {
    if (!isDeregister) {
      Sdk.debug('Registering', handler, team);
      if (!storage.teamToHandler[app]) {
        storage.teamToHandler[app] = {};
      }
      if (!storage.teamToHandler[app][team]) {
        storage.teamToHandler[app][team] = [];
      }
      if (!storage.teamToHandler[app][team].includes(handler)) {
        // Avoid duplicate registrations
        storage.teamToHandler[app][team].push(handler);
      }
    } else {
      Sdk.debug('Deregistering', handler, team);

      const index = storage.teamToHandler[app][team].indexOf(handler);
      if (index !== -1) {
        storage.teamToHandler[app][team].splice(index, 1);
      }
      if (Object.keys(storage.teamToHandler[app][team]).length == 0) {
        delete storage.teamToHandler[app][team];
      }
      if (Object.keys(storage.teamToHandler[app]).length === 0) {
        delete storage.teamToHandler[app];
      }
    }
  });

  return {
    status: 200,
    body: {
      message: `Successfully ${
        !isDeregister ? 'registered' : 'deregistered'
      } handler ${handler} for Slack team ${team}`,
    },
  };
}
