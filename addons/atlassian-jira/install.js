/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');

const resourcePath = 'atlassian_resource_path';

const getTemplateFiles = (fileNames) =>
  fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
  }, {});

module.exports = async (ctx) => {
  if (!ctx.caller.permissions) {
    return { status: 403 };
  }

  // Capture resource path and remove it as we will not need it in the addon instance
  let tokenResourcePath = ctx.body.configuration[resourcePath];
  delete ctx.body.configuration[resourcePath];

  // Create the Add-On Handler
  await Sdk.createFunction(
    ctx,
    {
      configurationSerialized: `# Add-on configuration settings
${Object.keys(ctx.body.configuration)
  .sort()
  .map((k) => `${k}=${ctx.body.configuration[k]}`)
  .join('\n')}
`,
      nodejs: {
        files: getTemplateFiles(['index.js', 'package.json', 'jira.js']),
      },
      security: {
        functionPermissions: {
          allow: [
            {
              // :execute connector instance
              action: 'function:execute',
              resource: tokenResourcePath,
            },
            {
              // :post to its own storage
              action: 'storage:*',
              resource:
                '/account/{{accountId}}/subscription/{{subscriptionId}}/storage/boundary/{{boundaryId}}/function/{{functionId}}/',
            },
          ],
        },
      },
      metadata: {
        fusebit: {
          editor: {
            navigationPanel: {
              hideFiles: ['index.js'],
            },
          },
        },
        ...ctx.body.metadata,
      },
    },
    ctx.fusebit.functionAccessToken
  );

  return { status: 200, body: { status: 200 } };
};
