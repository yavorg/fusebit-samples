const jira = require('./jira.js');
const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const JIRA = require('@atlassian/jira');

module.exports = async (ctx) => {
  // First, get an access token
  const response = await Superagent.post(ctx.configuration.atlassian_get_token_url).send({
    refresh_token: ctx.configuration.atlassian_refresh_token,
  });

  const accessToken = response.body.accessToken;
  const client = new JIRA();

  client.authenticate({
    type: 'token',
    token: accessToken
  });

  let sdk = {
    accessibleResources: await listAccessibleResources(accessToken),
    setResource: (cloudId) => (client.options.baseUrl = `https://api.atlassian.com/ex/jira/${cloudId}/rest`),
    ...client,
  };

  return jira(sdk, {
    ...ctx,
    storage: Sdk.getStorageClient(ctx),
  });
};

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
