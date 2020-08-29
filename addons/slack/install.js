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
        files: getTemplateFiles(['index.js', 'package.json', 'slack.js']),
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

  let registrationUrl = ctx.body.configuration.fusebit_events_registration;
  let token = ctx.body.configuration.fusebit_events_token;
  if (registrationUrl && token) {
    try {
      Sdk.debug('Events API configuration was present');
      await Superagent.post(registrationUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({
          app: ctx.body.configuration.slack_app_id,
          team_id: ctx.body.configuration.slack_team_id,
          handler: (await Sdk.getFunctionUrl(ctx)) + '/events/ingest',
        });

      Sdk.debug('Events API registration succeeded');
    } catch (e) {
      // Couldn't do Events API registration, clean up function and storage
      await Sdk.deleteStorage(ctx, storageSpecification);
      await Sdk.deleteFunction(ctx);
      throw e;
    }
  }

  return { status: 200, body: { status: 200 } };
};
