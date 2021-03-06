const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');
const settingsManager = Sdk.createSettingsManager(configure);
const { google } = require('googleapis');

/*

Add-on Settings Manager contract: 

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
  const oAuth2Client = new google.auth.OAuth2(
    ctx.configuration.google_client_id,
    ctx.configuration.google_client_secret,
    Sdk.getSelfUrl(ctx)
  );
  oAuth2Client.credentials = { refresh_token: ctx.body.refresh_token };
  const accessToken = (await oAuth2Client.getAccessToken()).token;
  return accessToken;
};

/**
 * @param ctx {FusebitContext}
 */
module.exports = async (ctx) => {
  if (ctx.body.refresh_token) {
    // Request for access token
    return { body: { accessToken: await getAccessToken(ctx) } };
  }

  return settingsManager(ctx);
};
