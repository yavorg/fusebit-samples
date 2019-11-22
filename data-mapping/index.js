const Superagent = require('superagent');
const mapping = require('./mapping.js');

/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = (ctx, cb) => {
    Superagent.get(ctx.configuration.DATA_URL).end((e,r) => {
        if (e || r.statusCode !== 200) {
            return cb(new Error(`Error fetching data from '${ctx.configuration.DATA_URL}'`));
        }
        return cb(null, { body: r.body.laureates.map(mapping) });
    });
};
