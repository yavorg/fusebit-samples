const Url = require('url');
const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');
const { verifyRequestSignature } = require('@slack/events-api');
const storage = require('./storage');
const Superagent = require('superagent');

/**
 * @param ctx {FusebitContext}
 */
module.exports = (ctx, cb) => {
    let url = Url.parse(ctx.url);
    let pathname = url.pathname.split('/');
    pathname.splice(0, 5);
    pathname = '/' + pathname.join('/');
    url.pathname = pathname;
    url = Url.format(url);

    Sdk.debug('NEW REQUEST', ctx.method, ctx.url);

    // Most requests go to the Settings Manager
    if (!pathname.startsWith('/events')) {
        Sdk.createSettingsManager(configure)(ctx).then(
            function (result) {
                cb(null, result);
            },
            function (err) {
                cb(err, null);
            }
        );
    } else {
        if (ctx.configuration.slack_signing_secret) {
            if (pathname.startsWith('/events/ingest') && ctx.method === 'POST') {
                handleEventIngest(ctx, cb);
            } else if (pathname.startsWith('/events/registration') && ctx.method === 'POST') {
                return registerCore(ctx, cb);
            } else if (pathname.startsWith('/events/registration') && ctx.method === 'DELETE') {
                return registerCore(ctx, cb, true);
                // COMMENT OUT WHEN NOT DEBUGGING
                // } else if(pathname.startsWith('/events/storage') && ctx.method === 'GET') {
                //     storage.ensureStorage(ctx);
                //     storage.ensureCache().then(()=>{
                //         cb(null, {
                //             status: 200,
                //             body: {
                //                 tokenToTeam : storage.tokenToTeam,
                //                 teamToHandler: storage.teamToHandler
                //             }
                //         });
                //         return;
                //     });
                // } else if(pathname.startsWith('/events/storage') && ctx.method === 'DELETE'){
                //     storage.ensureStorage(ctx);
                //     storage.ensureCache().then(()=>{
                //         storage.put(()=>{
                //             storage.tokenToTeam = {};
                //             storage.teamToHandler = {};
                //         }).then(()=>{
                //             cb(null, { status: 200 });
                //             return;
                //         });
                //     });
            } else {
                return cb(null, { status: 404 });
            }
        } else {
            return cb(null, {
                status: 404,
                body: 'Connector is not configured for Slack Events API',
            });
        }
    }
};

function handleEventIngest(ctx, cb) {
    debugTime('handleEventIngest');
    debugTimeLog(
        'handleEventIngest',
        `starting handleEventIngest ${ctx.query.dispatch !== undefined ? '(dispatch) ' : '(ingest) '}for`,
        ctx.body && ctx.body.event && ctx.body.event.text
    );

    try {
        verifyRequestSignature({
            signingSecret: ctx.configuration.slack_signing_secret,
            requestSignature: ctx.headers['x-slack-signature'],
            requestTimestamp: parseInt(ctx.headers['x-slack-request-timestamp'], 10),
            body: JSON.stringify(ctx.body).replace(/\//g, '\\/'),
        });
    } catch (e) {
        Sdk.debug('New event signature verification failed');
        Sdk.debug(JSON.stringify(ctx.body));
        cb(null, { status: 403 });
        return;
    }

    Sdk.debug('New event signature verified');
    debugTimeLog('handleEventIngest', 'signature verified');

    return ctx.query.dispatch !== undefined ? dispatch(ctx, cb) : respondToSlack(ctx, cb);
}

function respondToSlack(ctx, cb) {
    debugTime('respondToSlack');
    debugTimeLog('respondToSlack', 'starting respondToSlack');
    let slackTimestamp = +ctx.headers['x-slack-request-timestamp'] * 1000;
    Sdk.debug('Slack request time', slackTimestamp);

    // URL Verification Challenge
    if (ctx.body && ctx.body.type && ctx.body.type === 'url_verification') {
        Sdk.debug('URL Verification Challenge');
        cb(null, { body: { challenge: ctx.body.challenge } });
        return;
    }

    // Call back to itself to dispatch, wait 100ms, and confirm success to slack
    // The async dispatch can run beyond the Slack's 3s limit

    Superagent.post(ctx.baseUrl + '/events/ingest?dispatch')
        .set(ctx.headers)
        .send(ctx.body)
        .then(function (result) {
            debugTimeLog('respondToSlack', 'dispatch request to self completed with success');
        })
        .catch(function (error) {
            debugTimeLog('respondToSlack', 'dispatch request to self completed with erroer', error);
        });

    debugTimeLog('respondToSlack', 'initiated dispatch request to self');

    setTimeout(() => {
        debugTimeLog('respondToSlack', `responding with HTTP 200 to Slack after ${Date.now() - slackTimestamp}ms from Slack timestamp`);
        cb(null, { status: 200 });
    }, 100);
}

function dispatch(ctx, cb) {
    debugTime('dispatch', 'starting dispatch');
    let body = ctx.body;

    // Route all other events
    if (body && body.api_app_id && body.team_id) {
        storage.ensureStorage(ctx);
        storage.ensureCache().then(() => {
            debugTimeLog('dispatch', 'storage and cache loaded');

            Sdk.debug('Event is for Team ID', body.api_app_id, body.team_id);
            let handler = storage.teamToHandler[`${body.api_app_id}-${body.team_id}`];
            if (!handler) {
                Sdk.debug('No handler registered for this Team ID, not routing');
                cb();
                return;
            }

            Sdk.debug('Handlers registered for this Team ID', handler);

            const promises = handler.map((h) =>
                Superagent.post(h)
                    .send(body.event)
                    .ok((r) => {
                        debugTimeLog('dispatch', 'handler error return');
                        if (r.status >= 300) {
                            Sdk.debug('Handler error', h, r.body);
                        }
                        return true;
                    })
            );

            debugTimeLog('dispatch', 'initiated dispatch requests to handlers');

            Promise.all(promises)
                .then(function (result) {
                    Sdk.debug(`Routed ${handler.length} requests`);
                })
                .catch(function (error) {
                    Sdk.debug('Routing error', error);
                })
                .finally(function () {
                    debugTimeLog('dispatch', 'dispatch requests to handlers finished');
                    cb();
                    return;
                });
        });
    } else {
        Sdk.debug('No App ID and Team ID provided with event, not routing');
        cb();
    }
}

function registerCore(ctx, cb, isDeregister) {
    if (!ctx.headers.authorization) {
        cb(null, {
            status: 401,
            body: { message: 'Missing auth token' },
        });
        return;
    }

    storage.ensureStorage(ctx);

    storage.get().then(() => {
        const [bearerString, token] = ctx.headers.authorization.split(' ');
        if (bearerString !== 'Bearer' || !Object.keys(storage.tokenToTeam).includes(token)) {
            cb(null, {
                status: 401,
                body: { message: 'Invalid auth token' },
            });
            return;
        }

        let team, handler;
        if (!isDeregister) {
            if (!ctx.body || !ctx.body.app || !ctx.body.team_id || !ctx.body.handler) {
                cb(null, {
                    status: 401,
                    body: { message: 'Missing required app, team_id, and handler body parameters' },
                });
                return;
            } else {
                team = `${ctx.body.app}-${ctx.body.team_id}`;
                handler = ctx.body.handler;
            }
        } else {
            if (!ctx.query || !ctx.query.app || !ctx.query.team_id || !ctx.query.handler) {
                cb(null, {
                    status: 401,
                    body: { message: 'Missing required app, team_id, and handler query parameters' },
                });
                return;
            } else {
                team = `${ctx.query.app}-${ctx.query.team_id}`;
                handler = decodeURIComponent(ctx.query.handler);
            }
        }

        const tokenUsedUp = 'TokenUsedUp';
        const registrationProblem = 'RegistrationProblem';

        storage
            .put(() => {
                // Doing the token use check in here in case there is a storage conflict
                // and when the data is refreshed, it turns out the token was used up

                const [storedTeam, remainingUses] = storage.tokenToTeam[token];
                if ((!isDeregister && storedTeam !== team) || remainingUses < 1) {
                    Sdk.debug('Token is used up');
                    let e = new Error();
                    e.name = tokenUsedUp;
                    throw e;
                }

                let handlerRegistered = storage.teamToHandler[team] && storage.teamToHandler[team].includes(handler);
                if ((!isDeregister && handlerRegistered) || (isDeregister && !handlerRegistered)) {
                    let e = new Error();
                    e.name = registrationProblem;
                    throw e;
                }

                if (!isDeregister) {
                    Sdk.debug('Registering', handler, team);
                    if (!storage.teamToHandler[team]) {
                        storage.teamToHandler[team] = [];
                    }
                    storage.teamToHandler[team].push(handler);
                } else {
                    Sdk.debug('Deregistering', handler, team);
                    storage.teamToHandler[team].pop(handler);
                    if (storage.teamToHandler[team].length == 0) {
                        delete storage.teamToHandler[team];
                    }
                }

                if (remainingUses == 1) {
                    Sdk.debug('Token last use');
                    delete storage.tokenToTeam[token];
                } else {
                    Sdk.debug('Token first use');
                    storage.tokenToTeam[token] = [team, remainingUses - 1];
                }
            })
            .then(() => {
                cb(null, {
                    status: isDeregister ? 200 : 201,
                    body: {
                        message: `Successfully ${!isDeregister ? 'registered' : 'deregistered'} handler ${handler} for Slack team ${team}`,
                    },
                });
                return;
            })
            .catch((e) => {
                if (e.name === tokenUsedUp) {
                    cb(null, {
                        status: 401,
                        body: { message: 'Invalid auth token' },
                    });
                    return;
                } else if (e.name === registrationProblem) {
                    cb(null, {
                        status: 401,
                        body: { message: 'Registration problem: duplicate registration or deregistering missing registration.' },
                    });
                    return;
                } else {
                    cb(e);
                    return;
                }
            });
    });
}

function debugTime() {
    if (process.env.debug) {
        console.time.apply(console, arguments);
    }
}

function debugTimeLog() {
    if (process.env.debug) {
        console.timeLog.apply(console, arguments);
    }
}
