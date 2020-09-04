// Send "Hello world" to the ctx.configuration.slack_channel_name channel on Slack.
// If using Events API, register a separate handler function as shown below.

module.exports = async (slack, ctx) => {
  // If user access token was requested in addition to bot access token, you can
  // replace `slack.bot` with `slack.user` below to act on behalf of the user. If no
  // user access token is present, `slack.user` will be undefined.

  const conversations = await slack.bot.conversations.list();
  const channel = conversations.channels.filter((c) => c.name === ctx.configuration.slack_channel_name);
  if (channel && channel.length > 0) {
    const result = await slack.bot.chat.postMessage({
      text: `Hello world at ${new Date()}`,
      channel: channel[0].id,
    });

    const message = `Successfully sent message ${result.ts} in conversation ${channel[0].name}`;
    console.log(message);
    return { body: message };
  }
};

// When using Events API , each event type will be routed to a function named
// after the event type https://api.slack.com/events. In addition, all events are routed
// catch-all the function below.

// module.exports.slack = {
//     all: async (slack, event, ctx) => {
//         console.log(event);
//     }
// }
