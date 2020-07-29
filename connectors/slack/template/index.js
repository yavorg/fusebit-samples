const configure = require('./configure');
const Sdk = require('@fusebit/add-on-sdk');

/*

Add-on Settings Manager contract: 

Initialization - GET with query params
- [required] returnTo (returnTo, required)
- [optional] state (opaque, to roundtrip)
- [optional] data (base64 encoded JSON object, to augment and roundtrip)


Completion - 302 redirect to returnTo URL with query params
- [required] status (success or error)
- [required] data (augmented settings from initialization, or new settings if initialization did not provide any)
- [required if present on initialization] state (from initialization)

Whatever happens between initialization and completion is an implementation detail, but in a general case may involve a number of redirects.

/**
* @param ctx {FusebitContext}
*/
module.exports = Sdk.createSettingsManager(configure);
