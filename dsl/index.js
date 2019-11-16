const onPayment = require('./onPayment')

/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = (ctx, cb) => {
    if (!ctx.body || !ctx.body.customerId || ctx.body.amount === undefined) {
        return cb(null, { body: { error: 'Missing or malformed request body'}, status: 400 });
    }
    (async () => {
        let error;
        try {
            await onPayment(ctx.body.customerId, ctx.body.amount);
        }
        catch (e) {
            error = e;
        }
        cb(error, error ? undefined : { body: "ok" });
    })();
};
