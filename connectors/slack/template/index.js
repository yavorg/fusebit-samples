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
        return await handleEventIngest(ctx);
      } else if (pathname.startsWith('/events/registration') && ctx.method === 'POST') {
        return await registerCore(ctx);
      } else if (pathname.startsWith('/events/registration') && ctx.method === 'DELETE') {
        return await registerCore(ctx, true);
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
    storage.ensureStorage(ctx);
    await storage.ensureCache();
    Sdk.debug('Event is for Team ID', body.api_app_id, body.team_id);
    let tokens =
      storage.teamToHandler[body.api_app_id][body.team_id] &&
      Object.keys(storage.teamToHandler[body.api_app_id][body.team_id]);
    if (!tokens) {
      Sdk.debug('No handlers registered for this Team ID, not routing');
      return;
    }

    const promises = tokens.map((t) =>
      Superagent.post(storage.teamToHandler[body.api_app_id][body.team_id][t])
        .set('Authorization', `Bearer ${t}`)
        .send(body.event)
        .ok((r) => {
          if (r.status >= 300) {
            Sdk.debug('Handler error', storage.teamToHandler[body.api_app_id][body.team_id][t], r.body);
          }
          return true;
        })
    );

    try {
      await Promise.all(promises);
      Sdk.debug(`Routed ${tokens.length} requests`);
    } catch (error) {
      Sdk.debug('Routing error', error);
    }
  } else {
    Sdk.debug('No App ID and Team ID provided with event, not routing');
    return;
  }
}

async function registerCore(ctx, isDeregister) {
  if (!ctx.headers.authorization) {
    Sdk.debug('Missing auth token in request');
    return { status: 403 };
  }

  storage.ensureStorage(ctx);

  await storage.get();

  const match = ctx.headers.authorization.match(/^bearer\s+(.+)$/i);
  const token = match && match[1];
  if (!token || !storage.tokenToTeam[token]) {
    Sdk.debug('Invalid auth token, or using an unknown token');
    return { status: 403 };
  }

  let team, app, handler;
  if (!isDeregister) {
    if (!ctx.body || !ctx.body.app || !ctx.body.team_id || !ctx.body.handler) {
      return {
        status: 400,
        body: { message: 'Missing required app, team_id, and handler body parameters' },
      };
    } else {
      team = ctx.body.team_id;
      app = ctx.body.app;
      handler = ctx.body.handler;
    }
  } else {
    if (!ctx.query || !ctx.query.app || !ctx.query.team_id || !ctx.query.handler) {
      return {
        status: 400,
        body: { message: 'Missing required app, team_id, and handler query parameters' },
      };
    } else {
      team = ctx.query.team_id;
      app = ctx.query.app;
      handler = decodeURIComponent(ctx.query.handler);
    }
  }

  const badToken = 'Bad token';
  try {
    await storage.put(() => {
      // Doing the token use check in here in case there is a storage conflict
      // and when the data is refreshed, it turns out the token was used up

      if (
        !storage.tokenToTeam[token] ||
        !storage.tokenToTeam[token].team_id ||
        !storage.tokenToTeam[token].app_id ||
        storage.tokenToTeam[token].team_id !== team ||
        storage.tokenToTeam[token].app_id !== app
      ) {
        let e = new Error();
        e.name = badToken;
        throw e;
      }

      if (!isDeregister) {
        Sdk.debug('Registering', handler, team);
        if (!storage.teamToHandler[app]) {
          storage.teamToHandler[app] = {};
        }
        if (!storage.teamToHandler[app][team]) {
          storage.teamToHandler[app][team] = {};
        }
        // Always overwrite the handler for this token for reentrancy
        storage.teamToHandler[app][team][token] = handler;
      } else {
        Sdk.debug('Deregistering', handler, team);
        delete storage.teamToHandler[app][team][token];
        if (Object.keys(storage.teamToHandler[app][team]).length == 0) {
          delete storage.teamToHandler[app][team];
        }
        if (Object.keys(storage.teamToHandler[app]).length === 0) {
          delete storage.teamToHandler[app];
        }

        // Invalidate token
        Sdk.debug('Token revoke');
        delete storage.tokenToTeam[token];
      }
    });
  } catch (e) {
    if (e.name === badToken) {
      Sdk.debug('Invalid token');
      return { status: 403 };
    } else throw e;
  }

  return {
    status: 200,
    body: {
      message: `Successfully ${
        !isDeregister ? 'registered' : 'deregistered'
      } handler ${handler} for Slack team ${team}`,
    },
  };
}
