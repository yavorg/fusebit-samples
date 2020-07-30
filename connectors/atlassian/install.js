/*
This is the installation logic of the Lifecycle Manager. 
*/

const Fs = require('fs');
const getTemplateFile = fileName => Fs.readFileSync(__dirname + `/template/${fileName}`, { encoding: 'utf8' });
const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
    // Create the Addon Handler
    await Sdk.createFunction(ctx, { 
        configurationSerialized: `# Generate debugging information to logs
debug=1

# Atlassian Instance URL 
atlassian_host_url=${ctx.body.configuration.atlassian_host_url}

# OAuth Client ID of the Atlassian App
atlassian_client_id=${ctx.body.configuration.atlassian_client_id}

# OAuth Client Secret of the Atlassian App
atlassian_client_secret=${ctx.body.configuration.atlassian_client_secret}

# Default OAuth Scopes to request (optional, space delimited). This may be overridden by an Addon using this Connector.
atlassian_scope=${ctx.body.configuration.atlassian_scope || ''}

# Allowed returnTo URLs. Comma delimited. Use wildcard (*) at the end of a URL to allow for a prefix match
fusebit_allowed_return_to=${ctx.body.configuration.fusebit_allowed_return_to}
`,
        nodejs: {
            files: {
                'package.json': {
                    engines: {
                        node: "10"
                    },
                    dependencies: {
                        "superagent": "^5.2.2",
                        "@fusebit/add-on-sdk": "^1.0.5"
                    }
                },
                'index.js': getTemplateFile('index.js'),
                'initial.html': getTemplateFile('initial.html'),
                'configure.js': getTemplateFile('configure.js'),
            }
        },
        metadata: {
            fusebit: {
                editor: {
                    navigationPanel: {
                        hideFiles: [],
                    }
                }
            },
            ...ctx.body.metadata
        }
    });
    
    return { status: 200, body: { status: 200 }};
};

