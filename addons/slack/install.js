/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

const getTemplateFiles = fileNames => fileNames.reduce((a, c) => {
    a[c] = Fs.readFileSync(__dirname + `/template/${c}`, { encoding: 'utf8' });
    return a;
}, {});

module.exports = async (ctx) => { 
    // Create the Add-On Handler
    await Sdk.createFunction(ctx, {
        enableStorage: true,
        configurationSerialized: `# Add-on configuration settings
${Object.keys(ctx.body.configuration).sort().map(k => `${k}=${ctx.body.configuration[k]}`).join('\n')}
`,
        nodejs: {
            files: getTemplateFiles(['index.js', 'package.json', 'slack.js']),
        },
        metadata: {
            fusebit: {
                editor: {
                    navigationPanel: {
                        hideFiles: ['index.js'],
                    }
                }
            },
            ...ctx.body.metadata
        }
    });

    // If this connector is enabled for Events API
    if(ctx.body.configuration.fusebit_events_registration && ctx.body.configuration.fusebit_events_token){
        let registrationUrl = await Sdk.getFunctionUrl(ctx) + '/events/registration';
        await Superagent.post(registrationUrl);
    }    

    return { status: 200, body: { status: 200 }};
};
