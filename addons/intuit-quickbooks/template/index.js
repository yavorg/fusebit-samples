const qbo = require('./quickbooks.js');
const health = require('./health.js');
const util = require('util');
const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const QuickBooks = require('node-quickbooks');

let client;
const TOKEN_EXPIRY_BUFFER = 120;

module.exports = (ctx, callback) => {
  if (client) {
    if (Math.round(Date.now()) > ctx.configuration.intuit_token_expiry - TOKEN_EXPIRY_BUFFER) {
      // If the access token is close to expiring
      refreshTokenAndInvoke(ctx, callback);
    } else {
      invoke(ctx, callback);
    }
    return;
  }

  client = new QuickBooks(
    null, // Client ID, behavior is overridden
    null, // Client Secret, behavior is overridden
    null, // Access token, will be obtained
    false, // No token secret for Auth0
    ctx.configuration.intuit_company_id, // Company ID
    ctx.configuration.intuit_environment.toLowerCase() === 'sandbox', // Use production account
    false, // Turn debugging off
    null, // Use latest minor version
    '2.0', // OAuth version
    ctx.configuration.intuit_refresh_token
  );

  QuickBooks.setOauthVersion('2.0', client.useSandbox);

  // Use Fusebit Connector to get access token
  client.refreshAccessToken = (cb) => {
    Superagent.post(ctx.configuration.intuit_get_token_url)
      .send({
        refresh_token: ctx.configuration.intuit_refresh_token,
      })
      .then((res) => {
        client.refreshToken = res.body.refresh_token;
        ctx.configuration.intuit_refresh_token = res.body.refresh_token;
        client.token = res.body.access_token;
        ctx.configuration.intuit_refresh_token_expiry =
          res.body.x_refresh_token_expires_in + Math.round(Date.now() / 1000);
        ctx.configuration.intuit_token_expiry = res.body.expires_in + Math.round(Date.now() / 1000);
        if (cb) cb(null, res.body);
      })
      .catch((err) => {
        if (cb) cb(err);
      });
  };

  refreshTokenAndInvoke(ctx, callback);
};

function refreshTokenAndInvoke(ctx, cb) {
  client.refreshAccessToken((err) => {
    if (err) return cb(err);
    invoke(ctx, cb);
  });
}

function invoke(ctx, cb) {
  const sdk = {
    ...ctx,
    storage: Sdk.getStorageClient(ctx),
  };
  if (ctx.url.endsWith('health')) {
    return health(client, sdk, cb);
  } else {
    return qbo(client, sdk, cb);
  }
}
