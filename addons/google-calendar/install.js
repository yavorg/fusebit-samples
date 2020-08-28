/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');

const getTemplateFiles = (fileNames) =>
  fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
  }, {});

module.exports = async (ctx) => {
  // Create the Add-On Handler
  await Sdk.createFunction(ctx, {
    configurationSerialized: `# Add-on configuration settings
${Object.keys(ctx.body.configuration)
  .sort()
  .map((k) => `${k}=${ctx.body.configuration[k]}`)
  .join('\n')}
`,
    nodejs: {
      files: getTemplateFiles(['index.js', 'package.json']),
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
