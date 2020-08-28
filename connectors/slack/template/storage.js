const Sdk = require('@fusebit/add-on-sdk');

let storage;
module.exports.ensureStorage = (ctx) => {
  if (!storage) {
    storage = Sdk.getStorageClient(ctx);
  }
};

module.exports.teamToHandler = null;
module.exports.tokenToTeam = null;
var mappingTimestamp;
module.exports.get = async () => {
  let result = await storage.get();
  module.exports.teamToHandler = (result && result.teamToHandler) || {};
  module.exports.tokenToTeam = (result && result.tokenToTeam) || {};
  mappingTimestamp = Date.now();
};

module.exports.put = async (applyChanges) => {
  while (true) {
    // TODO Maybe add some backoff?

    applyChanges();

    try {
      await storage.put({
        teamToHandler: module.exports.teamToHandler,
        tokenToTeam: module.exports.tokenToTeam,
      });
      break;
    } catch (e) {
      Sdk.debug('Cache conflict');
      if (e.statusCode && e.statusCode == 409) {
        // Local copy is stale, need to refresh
        await storage.get();
      } else throw e;
    }
  }
};

module.exports.ensureCache = async () => {
  // If no in-memory cache present, or the cache is more than 15 sec old,
  // reload from storage
  if (!module.exports.teamToHandler || !module.exports.tokenToTeam || mappingTimestamp < Date.now() - 15000) {
    await module.exports.get();
  }
};
