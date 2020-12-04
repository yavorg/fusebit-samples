/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
  if (!ctx.caller.permissions) {
    return { status: 403 };
  }

  await Sdk.deleteFunction(ctx, ctx.fusebit.functionAccessToken);
  Sdk.debug('Function deleted');

  return { status: 204 };
};
