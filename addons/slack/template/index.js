const slack = require('./slack.js');
const Sdk = require('@fusebit/add-on-sdk');
const { WebClient } = require('@slack/web-api');
const Superagent = require('superagent');

module.exports = async (ctx) => {
    const sdk = {
        bot: new WebClient(ctx.configuration.slack_bot_access_token),
        user: ctx.configuration.slack_user_access_token ? new WebClient(ctx.configuration.slack_user_access_token) : null,
    };

    // Event registration/deregistration support
    if (ctx.url.endsWith('events/registration')) {
        Sdk.debug('Received Events API registration request');
        if (ctx.configuration.fusebit_events_registration && ctx.configuration.fusebit_events_token) {
            Sdk.debug('Events API configuration is present');

            // TODO What prevents someone who finds out this URL to hit it and
            // do an unauthorized registration/deregistration.

            let response;
            try {
                let body = {
                    app: ctx.configuration.slack_app_id,
                    team_id: ctx.configuration.slack_team_id,
                    handler: Sdk.getSelfUrl(ctx) + '/events/ingest',
                };
                if (ctx.method === 'POST') {
                    Sdk.debug('Sending registration POST request for', body);
                    response = await Superagent.post(ctx.configuration.fusebit_events_registration)
                        .set('Authorization', `Bearer ${ctx.configuration.fusebit_events_token}`)
                        .send(body);
                } else if (ctx.method === 'DELETE') {
                    Sdk.debug('Deregistration DELETE request for', body);
                    response = await Superagent.delete(ctx.configuration.fusebit_events_registration)
                        .set('Authorization', `Bearer ${ctx.configuration.fusebit_events_token}`)
                        .query({ app: body.app })
                        .query({ team_id: body.team_id })
                        .query({ handler: encodeURIComponent(body.handler) });
                } else {
                    return {
                        status: 400,
                        body: { message: 'Unsupported HTTP request type' },
                    };
                }
                return {
                    body: response.body,
                    status: response.status,
                };
            } catch (e) {
                if (e.status) {
                    // Superagent error, pass it through
                    return {
                        body: e.response.body,
                        status: e.status,
                    };
                } else {
                    // Other internal error
                    Sdk.debug('Call to registration endpoint failed', e);
                    return { status: 500 };
                }
            }
        } else {
            return {
                body: { message: 'Events API not configured', status: 500 },
            };
        }
    } else if (ctx.url.endsWith('events/ingest')) {
        Sdk.debug('Received Events API event');

        let response;
        try {
            if (ctx.method === 'POST') {
                let event = ctx.body;
                Sdk.debug('Valid event', event);

                // Attach all event handlers off a nested `slack` property
                let handlers = slack.slack;
                if (handlers) {
                    let functions = Object.getOwnPropertyNames(handlers).filter((p) => typeof handlers[p] === 'function');
                    let toInvoke = functions.filter((f) => f == event.type || f == 'all');

                    Sdk.debug('Invoking handlers', toInvoke);
                    toInvoke.forEach((t) => {
                        handlers[t](sdk, event, {
                            ...ctx.configuration,
                            storage: Sdk.getStorageClient(ctx),
                        });
                    });
                }

                return {
                    status: 201,
                };
            } else {
                return {
                    status: 400,
                    body: { message: 'Unsupported HTTP request type' },
                };
            }
            return {
                body: response.body,
                status: response.status,
            };
        } catch (e) {
            Sdk.debug('Call to registration endpoint failed', e);
            return { status: 500 };
        }
    } else {
        return slack(sdk, {
            ...ctx.configuration,
            storage: Sdk.getStorageClient(ctx),
        });
    }
};
