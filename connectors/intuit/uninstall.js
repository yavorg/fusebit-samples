/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
  let functionCtx = await Sdk.getFunctionDefinition(ctx);

  await Sdk.deleteFunction(ctx);
  Sdk.debug('Function deleted', functionCtx.location);

  return { status: 204 };
};
