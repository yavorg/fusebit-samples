const Express = require('express');
const { createEventAdapter } = require('@slack/events-api');
const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const storage = require('./storage');

const app = Express();

var slackEvents;
function ensureEventAdapter(ctx) {
    if (!slackEvents) {
        slackEvents = createEventAdapter(ctx.configuration.slack_signing_secret, {
            includeBody: true,
        });

        // Need to listen to all events, so hack in global listener
        const oldEmit = slackEvents.emit;
        slackEvents.emit = function (type, event, body, ...args) {
            onAll(event, body);
            oldEmit.apply(slackEvents, [type, event, body, ...args]);
        };

        async function onAll(event, body, ...args) {
            Sdk.debug('Received event', event, event.type);

            if (body && body.api_app_id) {
                Sdk.debug('Event is for App ID', body.api_app_id);
                let handler = storage.appToHandler[body.api_app_id];
                if (handler) {
                    Sdk.debug('Handler registered for this App ID', handler);

                    handler.forEach(async (h) => {
                        await Superagent.post(h).send(event);
                    });

                    Sdk.debug(`Routed ${handler.length} requests`);
                } else {
                    Sdk.debug('No handler registered for this App ID, not routing');
                }
            } else {
                Sdk.debug('No App ID provided with event, not routing');
            }
        }
    }
}

app.use('/events/ingest', async (req, res, next) => {
    storage.ensureStorage(req.fusebit);
    ensureEventAdapter(req.fusebit);
    await storage.ensureCache();

    // Plug the Slack events adapter in as a middleware
    slackEvents.requestListener()(req, res, next);
});

async function registerCore(req, res, isDeregister) {
    if (!req.headers.authorization) {
        res.status(401).send({
            message: 'Missing auth token',
        });
        return;
    }

    storage.ensureStorage(req.fusebit);

    await storage.get();

    const [bearerString, token] = req.headers.authorization.split(' ');
    if (bearerString !== 'Bearer' || !Object.keys(storage.tokenToApp).includes(token)) {
        res.status(401).send({
            message: 'Invalid auth token',
        });
        return;
    }

    let app, handler;
    if (!isDeregister) {
        if (!req.body || !req.body.app || !req.body.handler) {
            res.status(400).send({
                message: 'Missing required app and handler body parameters',
            });
            return;
        } else {
            app = req.body.app;
            handler = req.body.handler;
        }
    } else {
        if (!req.query || !req.query.app || !req.query.handler) {
            res.status(400).send({
                message: 'Missing required app and handler query parameters',
            });
            return;
        } else {
            app = req.query.app;
            handler = decodeURIComponent(req.query.handler);
        }
    }

    const tokenUsedUp = 'TokenUsedUp';
    const registrationProblem = 'RegistrationProblem';

    try {
        await storage.put(() => {
            // Doing the token use check in here in case there is a storage conflict
            // and when the data is refreshed, it turns out the token was used up

            const [storedApp, remainingUses] = storage.tokenToApp[token];
            if ((!isDeregister && storedApp !== app) || remainingUses < 1) {
                Sdk.debug('Token is used up');
                let e = new Error();
                e.name = tokenUsedUp;
                throw e;
            }

            let handlerRegistered = storage.appToHandler[app] && storage.appToHandler[app].includes(handler);
            if ((!isDeregister && handlerRegistered) || (isDeregister && !handlerRegistered)) {
                let e = new Error();
                e.name = registrationProblem;
                throw e;
            }

            if (!isDeregister) {
                Sdk.debug('Registering', handler, app);
                if (!storage.appToHandler[app]) {
                    storage.appToHandler[app] = [];
                }
                storage.appToHandler[app].push(handler);
            } else {
                Sdk.debug('Deregistering', handler, app);
                storage.appToHandler[app].pop(handler);
                if (storage.appToHandler[app].length == 0) {
                    delete storage.appToHandler[app];
                }
            }

            if (remainingUses == 1) {
                Sdk.debug('Token last use');
                delete storage.tokenToApp[token];
            } else {
                Sdk.debug('Token first use');
                storage.tokenToApp[token] = [app, remainingUses - 1];
            }
        });
    } catch (e) {
        if (e.name === tokenUsedUp) {
            res.status(401).send({
                message: 'Invalid auth token',
            });
            return;
        } else if (e.name === registrationProblem) {
            res.status(401).send({
                message: 'Registration problem: duplicate registration or deregistering missing registration.',
            });
            return;
        } else throw e;
    }

    res.status(isDeregister ? 200 : 201).send({
        message: `Successfully ${!isDeregister ? 'registered' : 'deregistered'} handler ${handler} for Slack app ${app}`,
    });
    return;
}

app.post('/events/registration', async function (req, res) {
    await registerCore(req, res);
});

app.delete('/events/registration', async function (req, res) {
    await registerCore(req, res, true);
});

// This programming model exposes Express app
module.exports = app;
