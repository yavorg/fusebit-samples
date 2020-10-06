const successFactors = require('./success-factors.js');
const Candidate = require('./client/candidate');
const Sdk = require('@fusebit/add-on-sdk');

module.exports = async (ctx) => {
  return successFactors(Candidate, {
    ...ctx,
    storage: Sdk.getStorageClient(ctx),
  });
};
