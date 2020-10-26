const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const crypto = require('crypto');
const initialView = require('fs').readFileSync(__dirname + '/initial.html', {
  encoding: 'utf8',
});
const URL = require('url').URL;
const OAuthClient = require('intuit-oauth');

module.exports = {
  initialState: 'initial',
  oAuthClient: (ctx) => {
    return new OAuthClient({
      clientId: ctx.configuration.intuit_client_id,
      clientSecret: ctx.configuration.intuit_client_secret,
      environment: ctx.configuration.intuit_environment, // ‘sandbox’ or ‘production’
      redirectUri: Sdk.getSelfUrl(ctx),
    });
  },
  states: {
    initial: async (ctx, state, data) => {
      // Initiate authentication

      Sdk.debug('INITIAL', state, data);

      state.configurationState = 'authCallback';
      state.data = data;

      const authorizationUrl = module.exports.oAuthClient(ctx).authorizeUri({
        scope: ctx.configuration.intuit_scope.split(' '),
        state: Sdk.serializeState(state),
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
        let authResponse;
        try {
          authResponse = await module.exports.oAuthClient(ctx).createToken(ctx.url);
          Sdk.debug('The token is  ' + JSON.stringify(authResponse.getJson()));
          if (!authResponse || !authResponse.token || !authResponse.token.refresh_token) {
            throw new Error('Unable to obtain access token');
          }
        } catch (e) {
          throw {
            status: 500,
            message: `Intuit authorization failed: ${e.message}`,
            state,
          };
        }

        let data = {
          ...state.data,
          intuit_refresh_token: authResponse.token.refresh_token,
          intuit_refresh_token_expiry: authResponse.token.x_refresh_token_expires_in + Math.round(Date.now() / 1000),
          intuit_token_expiry: authResponse.token.expires_in + Math.round(Date.now() / 1000),
          intuit_environment: ctx.configuration.intuit_environment,
          intuit_company_id: ctx.query.realmId,
          intuit_get_token_url: `${Sdk.getSelfUrl(ctx)}/token`,
        };

        return Sdk.completeWithSuccess(state, data);
      } else {
        throw {
          status: 500,
          message: `Intuit authorization failed: ${ctx.query.error_description || ctx.query.error || 'Unknown error'}`,
          state,
        };
      }
    },
  },
};
