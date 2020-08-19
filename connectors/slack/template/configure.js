const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const crypto = require('crypto');
const initialView = require('fs').readFileSync(__dirname + '/initial.html', {
    encoding: 'utf8',
});
const storage = require('./storage');

module.exports = {
    initialState: 'initial',
    states: {
        initial: async (ctx, state, data) => {
            // Initiatie authentication

            Sdk.debug('INITIAL', state, data);

            state.configurationState = 'authCallback';
            state.data = data;

            const selfUrl = Sdk.getSelfUrl(ctx);

            const authorizationUrl = `https://slack.com/oauth/v2/authorize?scope=${encodeURIComponent(
                ctx.configuration.slack_scope || ''
            )}${
                ctx.configuration.slack_user_scope ? '&user_scope=' + encodeURIComponent(ctx.configuration.slack_user_scope) : ''
            }&client_id=${encodeURIComponent(ctx.configuration.slack_client_id)}&redirect_uri=${encodeURIComponent(
                selfUrl
            )}&state=${encodeURIComponent(Sdk.serializeState(state))}`;

            const view = initialView
                .replace(/##templateName##/g, data.templateName)
                .replace(/##authorizationUrl##/g, authorizationUrl)
                .replace(/##returnTo##/, JSON.stringify(ctx.query.returnTo))
                .replace(/##state##/, ctx.query.state ? JSON.stringify(ctx.query.state) : 'null');

            return {
                body: view,
                bodyEncoding: 'utf8',
                headers: { 'content-type': 'text/html' },
                status: 200,
            };
        },

        authCallback: async (ctx, state) => {
            // Process auth callback

            if (ctx.query.code) {
                const selfUrl = Sdk.getSelfUrl(ctx);
                let response;
                try {
                    response = await Superagent.post(`https://slack.com/api/oauth.v2.access`).type('form').send({
                        code: ctx.query.code,
                        client_id: ctx.configuration.slack_client_id,
                        client_secret: ctx.configuration.slack_client_secret,
                        redirect_uri: selfUrl,
                    });
                    if (!response || !response.body || !response.body.access_token) {
                        throw new Error('Unable to obtain access token');
                    }
                } catch (e) {
                    throw {
                        status: 500,
                        message: `Slack authorization failed: ${e.message}`,
                        state,
                    };
                }

                let data = {
                    ...state.data,
                    slack_bot_access_token: response.body.access_token,
                    slack_bot_id: response.body.bot_user_id,
                    slack_user_access_token: response.body.authed_user && response.body.authed_user.access_token,
                    slack_user_id: response.body.authed_user && response.body.authed_user.id,
                    slack_app_id: response.body.app_id,
                };

                if (ctx.configuration.slack_signing_secret) {
                    // Generate and store token the function will later user to call back for
                    // events registration
                    storage.ensureStorage(ctx);
                    await storage.ensureCache();
                    let token = (await crypto.randomBytes(48)).toString('hex');
                    await storage.put(() => {
                        // Store which app this token is for and 2 remaining uses
                        storage.tokenToApp[token] = [response.body.app_id, 2];
                    });
                    data.fusebit_events_registration = selfUrl + '/events/registration';
                    data.fusebit_events_token = token;
                }

                return Sdk.completeWithSuccess(state, data);
            } else {
                throw {
                    status: 500,
                    message: `Slack authorization failed: ${ctx.query.error_description || ctx.query.error || 'Unknown error'}`,
                    state,
                };
            }
        },
    },
};
