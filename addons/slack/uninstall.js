/*
This is the uninstallation logic of the Lifecycle Manager. 
*/

const Sdk = require('@fusebit/add-on-sdk');
const Superagent = require('superagent');

module.exports = async (ctx) => {
    let registrationUrl = (await Sdk.getFunctionUrl(ctx)) + '/events/registration';
    try {
        await Superagent.delete(registrationUrl);
    } catch (_) {
        // Swallow, most commonly if this was never enabled for Events API
    }

    // Destroy the Add-On Handler
    await Sdk.deleteFunction(ctx);

    return { status: 204 };
};
