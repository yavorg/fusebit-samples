/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = (ctx, cb) => {
    if(ctx.body.challenge){
        cb(null, {body: {challenge: ctx.body.challenge}});
    } else {
        var event = ctx.body.event; 
        if(event.type === "message" && !event.subtype){
            console.log('Message type ' + ctx.body.event.channel_type + 
            ' from user ' + ctx.body.event.user + 
            ' at ' + ctx.body.event.ts + 
            ' with length ' + ctx.body.event.text.length);
        }
        cb(null);
    }
} 

