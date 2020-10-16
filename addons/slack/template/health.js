// This function does a quick authenticated call to Slack to ensure the
// token is valid. Customize this further to implement your own
// health heuristic

module.exports = async (slack, ctx) => {
  try {
    await slack.bot.api.test();
  } catch (e) {
    // Only pass through the error code and HTTP status
    const result = {
      body: { errorCode: e.code },
      status: 500,
    };
    if (e.statusCode) {
      result.status = e.statusCode;
    }
    return result;
  }

  return { status: 200 };
};
