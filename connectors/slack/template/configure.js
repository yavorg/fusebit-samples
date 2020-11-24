const Superagent = require('superagent');
const Sdk = require('@fusebit/add-on-sdk');
const crypto = require('crypto');
const initialView = require('fs').readFileSync(__dirname + '/initial.html', {
  encoding: 'utf8',
});
const storage = require('./storage');
const URL = require('url').URL;

module.exports = {
  initialState: 'initial',
  states: {
    initial: async (ctx, state, data) => {
      // Initiate authentication

      Sdk.debug('INITIAL', state, data);

      state.configurationState = 'authCallback';
      state.data = data;

      const url = new URL('https://slack.com/oauth/v2/authorize');
      if (ctx.configuration.slack_scope) {
        url.searchParams.append('scope', ctx.configuration.slack_scope);
      }
      if (ctx.configuration.slack_user_scope) {
        url.searchParams.append('user_scope', ctx.configuration.slack_user_scope);
      }
      url.searchParams.append('client_id', ctx.configuration.slack_client_id);
      url.searchParams.append('redirect_uri', Sdk.getSelfUrl(ctx));
      url.searchParams.append('state', Sdk.serializeState(state));
      const authorizationUrl = url.href;

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
          response = await Superagent.post(`https://slack.com/api/oauth.v2.access`).type('form').send({
            code: ctx.query.code,
            client_id: ctx.configuration.slack_client_id,
            client_secret: ctx.configuration.slack_client_secret,
            redirect_uri: selfUrl,
          });
          if (!response || !response.body || !response.body.access_token) {
            throw new Error('Unable to obtain access token');
          }
        } catch (e) {
          throw {
            status: 500,
            message: `Slack authorization failed: ${e.message}`,
            state,
          };
        }

        let data = {
          ...state.data,
          slack_bot_access_token: response.body.access_token,
          slack_bot_id: response.body.bot_user_id,
          slack_user_access_token: response.body.authed_user && response.body.authed_user.access_token,
          slack_user_id: response.body.authed_user && response.body.authed_user.id,
          slack_app_id: response.body.app_id,
          slack_team_id: response.body.team && response.body.team.id,
        };

        // To support Slack's Events API, we use this function as a router that the user registers
        // with Slack. So we need to be able to route incoming events to all addon instances that are
        // created for users of this app + team (workspace). The way this works is as follows:
        //
        // 1. During addon install, the addon template makes a call to register the addon URL it just created
        // to receive events
        //
        // 2. During addon uninstall, it makes the second call to deregister the instance
        //
        if (ctx.configuration.slack_signing_secret) {
          data.fusebit_events_registration = selfUrl + '/events/registration';
          data.fusebit_events_resource_path = `/account/${ctx.accountId}/subscription/${ctx.subscriptionId}/boundary/${ctx.boundaryId}/function/${ctx.functionId}/`;
        }

        return Sdk.completeWithSuccess(state, data);
      } else {
        throw {
          status: 500,
          message: `Slack authorization failed: ${ctx.query.error_description || ctx.query.error || 'Unknown error'}`,
          state,
        };
      }
    },
  },
};
