const confluence = require('./confluence.js');
const SwaggerClient = require('swagger-client');
const Superagent = require('superagent');
const fs = require('fs');
const unzip = require('util').promisify(require('zlib').unzip);
const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
  // First, get an access token
  const response = await Superagent.post(ctx.configuration.atlassian_get_token_url).send({
    refresh_token: ctx.configuration.atlassian_refresh_token,
  });

  const accessToken = response.body.accessToken;
  const client = await loadSpec(accessToken);

  let sdk = {
    accessibleResources: await listAccessibleResources(accessToken),
    setResource: (cloudId) => (client.spec.servers[0].url = `https://api.atlassian.com/ex/confluence/${cloudId}/rest`),
    ...client.apis,
  };

  return confluence(sdk, {
    ...ctx.configuration,
    storage: Sdk.getStorageClient(ctx),
  });
};

// API Documentation: https://developer.atlassian.com/cloud/confluence/rest/

// Adjust the function names in the API to be more human friendly.
const adjustOperationId = (object, adjuster) => {
  Object.keys(object).forEach((k) => {
    if (k === 'operationId') {
      object[k] = adjuster(object[k]);
    } else if (object[k] && typeof object[k] === 'object') {
      adjustOperationId(object[k], adjuster);
    }
  });
};

async function loadSpec(accessToken) {
  // From https://developer.atlassian.com/cloud/confluence/swagger.v3.json
  let data = fs.readFileSync(__dirname + '/swagger.v3.gz', { encoding: 'utf8' });
  let buffer = await unzip(Buffer.from(data, 'base64'));
  let spec = JSON.parse(buffer);

  // Adjust the function names to be nicer.
  adjustOperationId(spec, (oId) => {
    let last = oId.lastIndexOf('_');
    last = last < 0 ? undefined : last;

    return oId.slice(oId.lastIndexOf('.') + 1, last);
  });

  // The specification, including the authorization details, for the OpenAPI interface.
  let swagSpec = {
    spec,
    authorizations: {
      oAuthDefinitions: {
        token: {
          access_token: accessToken,
        },
      },
    },
  };

  // Parse the specification and generate the API.
  return await new Promise((resolve, reject) => new SwaggerClient(swagSpec).then((client) => resolve(client)));
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

  // Example response:
  // [
  //   {
  //     "id": "d0a50dbb-9553-444e-80e3-5080fa25a3b4",
  //     "url": "https://magitech-test.atlassian.net",
  //     "name": "magitech-test",
  //     "scopes": [
  //       "search:confluence",
  //       "read:confluence-props",
  //       "read:confluence-space.summary",
  //       "read:confluence-content.summary",
  //       "read:confluence-content.all"
  //     ],
  //     "avatarUrl": "https://site-admin-avatar-cdn.prod.public.atl-paas.net/avatars/240/flag.png"
  //   }
  // ]

  if (!response.body) {
    return [];
  } else {
    // Assuming if we see this scope then we have Confluence, not sure if there is a better way
    return response.body.filter((x) => x.scopes.includes('read:confluence-space.summary'));
  }
}
