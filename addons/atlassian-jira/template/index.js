const jira = require('./jira.js');
const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const JIRA = require('@atlassian/jira');

let accessToken;
let accessTokenExpiry; // milliseconds
const tokenExpiryBuffer = 120000; // 2 minutes in milliseconds

module.exports = async (ctx) => {
  // Get an access token or refresh the current one
  if (!accessToken || Date.now() > ctx.accessTokenExpiry - tokenExpiryBuffer) {
    const response = await Superagent.post(ctx.configuration.atlassian_get_token_url)
      .set('Authorization', `Bearer ${ctx.fusebit.functionAccessToken}`)
      .send({
        refresh_token: ctx.configuration.atlassian_refresh_token,
      });

    accessToken = response.body.access_token;
    accessTokenExpiry = response.body.expires_in * 1000 + Date.now();
  }

  const client = new JIRA();

  client.authenticate({
    type: 'token',
    token: accessToken,
  });

  let sdk = {
    accessibleResources: await listAccessibleResources(accessToken),
    setResource: (cloudId) => (client.options.baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest`),
    ...client,
  };

  return jira(sdk, {
    ...ctx,
    storage: await getStorageClient(ctx),
  });
};

async function getStorageClient(ctx) {
  return Sdk.createStorageClient(
    ctx,
    ctx.fusebit.functionAccessToken,
    `boundary/${ctx.boundaryId}/function/${ctx.functionId}`
  );
}

async function listAccessibleResources(accessToken) {
  let response;
  try {
    response = await Superagent('https://api.atlassian.com/oauth/token/accessible-resources')
      .set('Authorization', 'Bearer ' + accessToken)
      .set('Accept', 'application/json');
  } catch (e) {
    console.log('Accessible Resources Exception');
    throw e;
  }

  if (!response.body) {
    return [];
  } else {
    return response.body.filter((x) => x.scopes.includes('read:jira-work'));
  }
}
