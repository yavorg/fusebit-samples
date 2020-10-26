const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');

/**
 * @param ctx {FusebitContext}
 */
module.exports = async (ctx) => {
  if (ctx.body.refresh_token) {
    const authResponse = await configure.oAuthClient(ctx).refreshUsingToken(ctx.body.refresh_token);
    return { body: authResponse.token };
  }

  return Sdk.createSettingsManager(configure)(ctx);
};
