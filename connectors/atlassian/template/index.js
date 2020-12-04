const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');
const settingsManager = Sdk.createSettingsManager(configure);
const Superagent = require('superagent');

/*

Addon Settings Manager contract: 

Initialization - GET with query params
- [required] returnTo (returnTo, required)
- [optional] state (opaque, to roundtrip)
- [optional] data (base64 encoded JSON object, to augment and roundtrip)


Completion - 302 redirect to returnTo URL with query params
- [required] status (success or error)
- [required] data (augmented settings from initialization, or new settings if initialization did not provide any)
- [required if present on initialization] state (from initialization)

Whatever happens between initialization and completion is an implementation detail, but in a general case may involve a number of redirects.

*/

const getAccessToken = async (ctx) => {
  let response;
  await Superagent.post('https://auth.atlassian.com/oauth/token')
    .set('Content-Type', 'application/json')
    .send({
      grant_type: 'refresh_token',
      client_id: ctx.configuration.atlassian_client_id,
      client_secret: ctx.configuration.atlassian_client_secret,
      refresh_token: ctx.body.refresh_token,
      redirect_uri: Sdk.getSelfUrl(ctx),
    })
    .then((res) => (response = res));

  return response.body;
};

/**
 * @param ctx {FusebitContext}
 */
module.exports = async (ctx) => {
  if (ctx.body.refresh_token) {
    if (!ctx.caller.permissions) {
      return { status: 403 };
    }

    // Request for access token
    return { body: await getAccessToken(ctx) };
  }

  return settingsManager(ctx);
};
