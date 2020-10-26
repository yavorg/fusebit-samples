/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

const getTemplateFiles = (fileNames) =>
  fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
  }, {});

module.exports = async (ctx) => {
  let storageSpecification = await Sdk.createStorage(ctx);

  // Create the Add-On Handler
  try {
    await Sdk.createFunction(ctx, {
      configurationSerialized: `# Add-on configuration settings
${Object.keys(ctx.body.configuration)
  .sort()
  .map((k) => `${k}=${ctx.body.configuration[k]}`)
  .join('\n')}

  # Storage configuration settings
${Object.keys(storageSpecification)
  .sort()
  .map((k) => `${k}=${storageSpecification[k]}`)
  .join('\n')}
`,
      nodejs: {
        files: getTemplateFiles(['index.js', 'package.json', 'quickbooks.js', 'health.js']),
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
    });
  } catch (e) {
    // Could not create function, clean up storage
    await Sdk.deleteStorage(ctx, storageSpecification);
    throw e;
  }

  return { status: 200, body: { status: 200 } };
};
