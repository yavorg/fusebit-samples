/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const getTemplateFile = (fileName) => Fs.readFileSync(__dirname + `/template/${fileName}`, { encoding: 'utf8' });
const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
  let storageSpecification = await Sdk.createStorage(ctx);

  // Create the Add-On Handler
  await Sdk.createFunction(ctx, {
    configurationSerialized: `# Generate debugging information to logs
debug=1

# OAuth Client ID of the Slack application
slack_client_id=${ctx.body.configuration.slack_client_id}

# OAuth Client Secret of the Slack application
slack_client_secret=${ctx.body.configuration.slack_client_secret}

# Signing Secret of the Slack application
slack_signing_secret=${ctx.body.configuration.slack_signing_secret}

# OAuth Bot user token scopes to request
slack_scope=${ctx.body.configuration.slack_scope || ''}

# OAuth User token scopes to request
slack_user_scope=${ctx.body.configuration.slack_user_scope || ''}

# Allowed returnTo URLs. Comma delimited. Use wildcard (*) at the end of a URL to allow for a prefix match
fusebit_allowed_return_to=${ctx.body.configuration.fusebit_allowed_return_to}

# Storage configuration settings
${Object.keys(storageSpecification)
  .sort()
  .map((k) => `${k}=${storageSpecification[k]}`)
  .join('\n')}
`,
    nodejs: {
      files: {
        'package.json': {
          engines: {
            node: '10',
          },
          dependencies: {
            '@fusebit/add-on-sdk': '^2.1.0',
            superagent: '^5.2.2',
            '@slack/events-api': '^2.3.4',
          },
        },
        'index.js': getTemplateFile('index.js'),
        'storage.js': getTemplateFile('storage.js'),
        'initial.html': getTemplateFile('initial.html'),
        'configure.js': getTemplateFile('configure.js'),
      },
    },
    metadata: {
      fusebit: {
        editor: {
          navigationPanel: {
            hideFiles: [],
          },
        },
      },
      ...ctx.body.metadata,
    },
  });

  return { status: 200, body: { status: 200 } };
};
