const Mock = require('mock-http');
const Express = require('express');
const Url = require('url');
const app = require('./app');
const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');

// Express.response is a prototype of the Express response object that Express explicitly sets
// as the prototype of the Node.js response object passed into the Express API (using Object.setPrototypeOf()).
// This is how Express injects its APIs over plain Node.js response object. The prototype of
// the Express prototype object is Node.js's ServerResponse. Since we want to replace it with a mocked response,
// we are going to manually change the prototype of the Express prototype to be the prototype of the mocked
// response object. The original inheritance hierarchy was:
// (Express response) -> ServerResponse -> OutgoingMessage -> Writable -> EventEmitter -> Object
// After the change, it will be:
// (Express response) -> (Mocked response) -> Writable -> EventEmitter -> Object
// And then the request gets similar treatment.
Object.setPrototypeOf(Object.getPrototypeOf(Express.response), Mock.Response.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(Express.request), Mock.Request.prototype);

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

    // Most requests go to the Settings Manager
    if (!pathname.startsWith('/events')) {
        // Add-on Settings Manager contract:

        // Initialization - GET with query params
        // - [required] returnTo (returnTo, required)
        // - [optional] state (opaque, to roundtrip)
        // - [optional] data (base64 encoded JSON object, to augment and roundtrip)

        // Completion - 302 redirect to returnTo URL with query params
        // - [required] status (success or error)
        // - [required] data (augmented settings from initialization, or new settings if initialization did not provide any)
        // - [required if present on initialization] state (from initialization)

        // Whatever happens between initialization and completion is an implementation detail, but in a general case may involve a number of redirects.

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
            // All other requests go to Express
            const body = ctx.body ? Buffer.from(JSON.stringify(ctx.body)) : undefined;

            if (body) {
                ctx.headers['content-length'] = body.length;
            }

            let req = new Mock.Request({
                url,
                method: ctx.method,
                headers: ctx.headers,
                buffer: body,
            });

            // TODO Something is busted with this Express hack, the default
            // express.json() body parser doesn't work unless you set this explicitly
            req.body = ctx.body;

            // TODO Just like the above, the hack breaks @slack/events-api as well
            req.rawBody = body || Buffer.from('');

            let res = new Mock.Response({
                onEnd: () => {
                    return cb(null, {
                        body: (res._internal.buffer || Buffer.from('')).toString('base64'),
                        bodyEncoding: 'base64',
                        headers: res._internal.headers,
                        status: res.statusCode,
                    });
                },
            });

            req.fusebit = ctx;

            return app.handle(req, res);
        } else {
            return {
                body: { message: 'Connector is not configured for Slack Events API' },
            };
        }
    }
};
