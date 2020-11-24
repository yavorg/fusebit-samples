const slack = require('./slack.js');
const health = require('./health.js');
const Sdk = require('@fusebit/add-on-sdk');
const { WebClient } = require('@slack/web-api');

async function getStorageClient(ctx) {
  return Sdk.createStorageClient(
    ctx,
    ctx.fusebit.functionAccessToken,
    `boundary/${ctx.boundaryId}/function/${ctx.functionId}`
  );
}

module.exports = async (ctx) => {
  const sdk = {
    bot: new WebClient(ctx.configuration.slack_bot_access_token),
    user: ctx.configuration.slack_user_access_token ? new WebClient(ctx.configuration.slack_user_access_token) : null,
  };

  if (ctx.url.endsWith('events/ingest')) {
    Sdk.debug('Received Events API event');

    if (!ctx.caller.permissions) {
      return { status: 403 };
    }

    try {
      if (ctx.method === 'POST') {
        let event = ctx.body;
        Sdk.debug('Valid event', event);

        // Attach all event handlers off a nested `slack` property
        let handlers = slack.slack;
        if (handlers) {
          const functions = Object.getOwnPropertyNames(handlers)
            .filter((p) => typeof handlers[p] === 'function')
            .filter((f) => f == event.type || f == 'all');
          const client = await getStorageClient(ctx);
          const promises = functions.map((f) =>
            handlers[f](sdk, event, {
              ...ctx.configuration,
              storage: client,
            })
          );

          Sdk.debug('Invoking handlers', functions);
          await Promise.all(promises);

          Sdk.debug('All handlers completed');
        }
        return {
          status: 201,
        };
      } else {
        return {
          status: 400,
          body: { message: 'Unsupported HTTP request type' },
        };
      }
    } catch (e) {
      Sdk.debug('Dispatching message to event handlers failed', e);
      return { status: 500, body: { message: 'Dispatching message to event handlers failed' } };
    }
  } else if (ctx.url.endsWith('health')) {
    return health(sdk, {
      ...ctx,
      storage: await getStorageClient(ctx),
    });
  } else {
    return slack(sdk, {
      ...ctx,
      storage: await getStorageClient(ctx),
    });
  }
};
