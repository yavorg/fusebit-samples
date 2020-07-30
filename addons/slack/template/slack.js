module.exports = async (slack, ctx) => {
    // Send "Hello world" to the #{ctx.slack_channel_name} channel on Slack

    const conversations = await slack.conversations.list();
    const channel = conversations.channels.filter(c => c.name === ctx.slack_channel_name);
    if (channel && channel.length > 0) {
        const result = await slack.chat.postMessage({
            text: `Hello world at ${new Date()}`,
            channel: channel[0].id,
        });
        
        const message = `Successfully sent message ${result.ts} in conversation ${channel[0].name}`;
        console.log(message);
        return {body: message};

    }  
}
