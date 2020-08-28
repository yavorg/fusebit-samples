/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

module.exports = async (ctx) => {
  let registrationUrl = (await Sdk.getFunctionUrl(ctx)) + '/events/registration';
  try {
    await Superagent.delete(registrationUrl);
  } catch (e) {
    // Swallow, most commonly if this was never enabled for Events API
    Sdk.debug('Deregistration error', e);
  }

  // Destroy the Add-On Handler
  await Sdk.deleteFunction(ctx);

  return { status: 204 };
};
