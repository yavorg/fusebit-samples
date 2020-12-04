const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const initialView = require('fs').readFileSync(__dirname + '/initial.html', {
  encoding: 'utf8',
});

module.exports = {
  initialState: 'initial',
  states: {
    initial: async (ctx, state, data) => {
      // Initiate authentication

      Sdk.debug('INITIAL', state, data);

      state.configurationState = 'authCallback';
      state.data = data;

      const selfUrl = Sdk.getSelfUrl(ctx);

      const authorizationUrl =
        `https://auth.atlassian.com/authorize?audience=api.atlassian.com&` +
        `client_id=${ctx.configuration.atlassian_client_id}&` +
        `scope=offline_access ${data.atlassian_scope || ctx.configuration.atlassian_scope || ''}&` +
        `redirect_uri=${selfUrl}&` +
        `state=${Sdk.serializeState(state)}&` +
        `response_type=code&` +
        `prompt=consent`;

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
          await Superagent.post('https://auth.atlassian.com/oauth/token')
            .set('Content-Type', 'application/json')
            .send({
              grant_type: 'authorization_code',
              client_id: ctx.configuration.atlassian_client_id,
              client_secret: ctx.configuration.atlassian_client_secret,
              code: ctx.query.code,
              redirect_uri: selfUrl,
            })
            .then((res) => (response = res));

          if (!response || !response.body.refresh_token) {
            throw new Error('Unable to obtain refresh token');
          }
        } catch (e) {
          throw {
            status: 500,
            message: `Atlassian authentication failed: ${e.message}`,
            state,
          };
        }
        let data = {
          ...state.data,
          atlassian_refresh_token: response.body.refresh_token,
          atlassian_get_token_url: `${selfUrl}/token`,
          atlassian_resource_path: `/account/${ctx.accountId}/subscription/${ctx.subscriptionId}/boundary/${ctx.boundaryId}/function/${ctx.functionId}/`,
        };
        return Sdk.completeWithSuccess(state, data);
      } else {
        throw {
          status: 500,
          message: `Atlassian authentication failed: ${
            ctx.query.error_description || ctx.query.error || 'Unknown error'
          }`,
          state,
        };
      }
    },
  },
};
