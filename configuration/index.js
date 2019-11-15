/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = (ctx, cb) => {
    console.log('TWILIO_KEY is', ctx.configuration.TWILIO_KEY);
    console.log('SLACK_URL is', ctx.configuration.SLACK_URL);
    cb(null, { body: "hello" });
};
