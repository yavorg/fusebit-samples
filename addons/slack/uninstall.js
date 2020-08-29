/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

module.exports = async (ctx) => {
  let functionCtx = await Sdk.getFunctionDefinition(ctx);

  await Sdk.deleteStorage(ctx, functionCtx.configuration);
  Sdk.debug('Storage deleted', functionCtx.location);

  // Deregister Event API
  const {
    fusebit_events_registration: registrationUrl,
    fusebit_events_token: token,
    slack_app_id: app,
    slack_team_id: team_id,
  } = functionCtx.configuration;
  const handler = functionCtx.location + '/events/ingest';

  if (registrationUrl && token) {
    Sdk.debug('Events API configuration was present');

    await Superagent.delete(registrationUrl)
      .set('Authorization', `Bearer ${token}`)
      .query({ app: app })
      .query({ team_id: team_id })
      .query({ handler: encodeURIComponent(handler) });

    Sdk.debug('Events API deregistration succeeded');
  }

  await Sdk.deleteFunction(ctx);
  Sdk.debug('Function deleted', functionCtx.location);

  return { status: 204 };
};
