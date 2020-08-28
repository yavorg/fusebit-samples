const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const initialView = require('fs').readFileSync(__dirname + '/initial.html', {
  encoding: 'utf8',
});
const { google } = require('googleapis');

module.exports = {
  initialState: 'initial',
  states: {
    initial: async (ctx, state, data) => {
      // Initiatie authentication

      Sdk.debug('INITIAL', state, data);

      state.configurationState = 'authCallback';
      state.data = data;

      const selfUrl = Sdk.getSelfUrl(ctx);

      const oAuth2Client = new google.auth.OAuth2(
        ctx.configuration.google_client_id,
        ctx.configuration.google_client_secret,
        selfUrl
      );

      const authorizationUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: data.google_scope || ctx.configuration.google_scope || '',
        prompt: 'consent select_account',
        redirect_uri: selfUrl,
        state: Sdk.serializeState(state),
        response_type: 'code',
      });

      const view = initialView
        .replace(/##templateName##/g, data.templateName)
        .replace(/##authorizationUrl##/g, authorizationUrl)
        .replace(/##returnTo##/, JSON.stringify(ctx.query.returnTo))
        .replace(/##state##/, ctx.query.state ? JSON.stringify(ctx.query.state) : 'null');

      return {
        body: view,
        bodyEncoding: 'utf8',
        headers: { 'content-type': 'text/html' },
        status: 200,
      };
    },

    authCallback: async (ctx, state) => {
      // Process auth callback

      if (ctx.query.code) {
        const selfUrl = Sdk.getSelfUrl(ctx);
        let response;
        try {
          const oAuth2Client = new google.auth.OAuth2(
            ctx.configuration.google_client_id,
            ctx.configuration.google_client_secret,
            selfUrl
          );
          response = await new Promise((resolve, reject) => {
            oAuth2Client.getToken(ctx.query.code, (error, token) => (error ? reject(error) : resolve(token)));
          });
          if (!response || !response.refresh_token) {
            throw new Error('Unable to obtain refresh token');
          }
        } catch (e) {
          throw {
            status: 500,
            message: `Google authentication failed: ${e.message}`,
            state,
          };
        }
        let data = {
          ...state.data,
          google_refresh_token: response.refresh_token,
          google_get_token_url: `${selfUrl}/token`,
        };
        return Sdk.completeWithSuccess(state, data);
      } else {
        throw {
          status: 500,
          message: `Google authentication failed: ${ctx.query.error_description || ctx.query.error || 'Unknown error'}`,
          state,
        };
      }
    },
  },
};
