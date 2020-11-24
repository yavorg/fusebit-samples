/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

module.exports = async (ctx) => {
  if (!ctx.caller.permissions) {
    return { status: 403 };
  }

  const storage = await Sdk.createStorageClient(
    ctx.body,
    ctx.fusebit.functionAccessToken,
    `boundary/${ctx.body.boundaryId}/function/${ctx.body.functionId}`
  );
  await storage.delete();
  Sdk.debug('Storage deleted');

  // Deregister Event API
  let functionCtx = await Sdk.getFunctionDefinition(ctx, ctx.fusebit.functionAccessToken);
  const {
    fusebit_events_registration: registrationUrl,
    slack_app_id: app,
    slack_team_id: team_id,
  } = functionCtx.configuration;
  const handler = functionCtx.location + '/events/ingest';

  if (registrationUrl) {
    Sdk.debug('Events API configuration was present');

    await Superagent.delete(registrationUrl)
      .set('Authorization', `Bearer ${ctx.fusebit.functionAccessToken}`)
      .query({ app: app })
      .query({ team_id: team_id })
      .query({ handler: encodeURIComponent(handler) });

    Sdk.debug('Events API deregistration succeeded');
  }

  await Sdk.deleteFunction(ctx, ctx.fusebit.functionAccessToken);
  Sdk.debug('Function deleted');

  return { status: 204 };
};
