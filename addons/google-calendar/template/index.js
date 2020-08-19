const Superagent = require('superagent');
const { google } = require('googleapis');

/**
 * @param ctx {FusebitContext}
 */
module.exports = async (ctx) => {
    // First, get an access token
    const response = await Superagent.post(ctx.configuration.google_get_token_url).send({
        refresh_token: ctx.configuration.google_refresh_token,
    });
    const access_token = response.body.accessToken;

    // Then, call the API
    const auth = new google.auth.OAuth2();
    auth.credentials = { access_token };
    const calendar = google.calendar({ version: 'v3', auth });
    const events = await calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        maxResults: +ctx.configuration.max_results || 10,
        singleEvents: true,
        orderBy: 'startTime',
    });

    return { body: { events: events.data.items } };
};
