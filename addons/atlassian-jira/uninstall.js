/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');

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

  await Sdk.deleteFunction(ctx, ctx.fusebit.functionAccessToken);
  Sdk.debug('Function deleted');

  return { status: 204 };
};
