/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

module.exports = async (ctx) => {
  let functionCtx = await Sdk.getFunctionDefinition(ctx);

  await Sdk.deleteStorage(ctx, functionCtx.configuration);
  Sdk.debug('Storage deleted', functionCtx.location);

  await Sdk.deleteFunction(ctx);
  Sdk.debug('Function deleted', functionCtx.location);

  return { status: 204 };
};
