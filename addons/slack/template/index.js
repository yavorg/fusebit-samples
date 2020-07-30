const slack = require('./slack.js');
//const Sdk = require('@fusebit/add-on-sdk');
const { WebClient } = require('@slack/web-api');

module.exports = async (ctx) => {
    const client = new WebClient(ctx.configuration.slack_access_token)

    let sdk = {
        ...client
    }

    return slack(sdk, {
        ...ctx.configuration,
        // storage: Sdk.getStorageClient(ctx)
    });
}
