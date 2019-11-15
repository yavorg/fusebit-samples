const handler = require('./handler');
const Mock = require('mock-http');
const Express = require('express');
const Url = require('url'); 

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
* @param cb {FusebitCallback}
*/
module.exports = (ctx, cb) => {

    let url = ctx.url.split('/');
    url.splice(0,5);
    url = Url.parse('/' + url.join('/'));
    url.query = ctx.query;
    url = Url.format(url);

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

    let res = new Mock.Response({
        onEnd: () => {
            return cb(null, {  
                body: (res._internal.buffer || Buffer.from('')).toString('base64'),
                bodyEncoding: 'base64',
                headers: res._internal.headers,
                status: res.statusCode,
            })
        }
    });

    return handler(ctx, req, res);
};
