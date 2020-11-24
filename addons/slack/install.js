/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

const eventsResourcePathKey = 'fusebit_events_resource_path';

const getTemplateFiles = (fileNames) =>
  fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
  }, {});

module.exports = async (ctx) => {
  if (ctx.caller.permissions) {
    // Create the Add-On Handler

    // Capture resource path and remove it as we will not need it in the addon instance
    let eventsResourcePath = ctx.body.configuration[eventsResourcePathKey];
    delete ctx.body.configuration[eventsResourcePathKey];

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
          files: getTemplateFiles(['index.js', 'package.json', 'slack.js', 'health.js']),
        },

        security: {
          // External calls from customer infrastructure
          // Internal calls from connector instance with Events API messages
          authentication: 'optional',
          authorization: [
            {
              action: 'function:execute',
              resource:
                '/account/{{accountId}}/subscription/{{subscriptionId}}/boundary/{{boundaryId}}/function/{{functionId}}/',
            },
          ],
          functionPermissions: {
            allow: [
              // If the connector supports Events API, the addons need to register to receive events.
              // If the resource path is not present, that means Events API was not configured and
              // there is no need for this call and the associated permission.
              ...(eventsResourcePath
                ? [
                    {
                      // :execute connector instance
                      action: 'function:execute',
                      resource: eventsResourcePath,
                    },
                  ]
                : []),
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

    let registrationUrl = ctx.body.configuration.fusebit_events_registration;
    if (registrationUrl) {
      try {
        Sdk.debug('Events API configuration was present');
        await Superagent.post(registrationUrl)
          .set('Authorization', `Bearer ${ctx.fusebit.functionAccessToken}`)
          .send({
            app: ctx.body.configuration.slack_app_id,
            team_id: ctx.body.configuration.slack_team_id,
            handler: (await Sdk.getFunctionUrl(ctx, ctx.fusebit.functionAccessToken)) + '/events/ingest',
          });

        Sdk.debug('Events API registration succeeded');
      } catch (e) {
        // Couldn't do Events API registration, clean up function
        await Sdk.deleteFunction(ctx, ctx.fusebit.functionAccessToken);
        throw e;
      }
    }

    return { status: 200, body: { status: 200 } };
  } else {
    return { status: 403 };
  }
};
