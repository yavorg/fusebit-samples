const slack = require('./slack.js');
//const Sdk = require('@fusebit/add-on-sdk');
const { WebClient } = require('@slack/web-api');

module.exports = async (ctx) => {
    const sdk = {
        bot : new WebClient(ctx.configuration.slack_bot_access_token),
        user: ctx.configuration.slack_user_access_token ? new WebClient(ctx.configuration.slack_user_access_token) : null
    }

    return slack(sdk, {
        ...ctx.configuration,
        // storage: Sdk.getStorageClient(ctx)
    });
}
