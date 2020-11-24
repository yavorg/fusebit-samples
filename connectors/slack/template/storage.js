const Sdk = require('@fusebit/add-on-sdk');

let mappingTimestamp;
let etag;
const cacheTTL = 15000; // 15 seconds
const storagePath = 'teamToHandler';

async function getStorageClient(ctx) {
  return await Sdk.createStorageClient(
    ctx,
    ctx.fusebit.functionAccessToken,
    `boundary/${ctx.boundaryId}/function/${ctx.functionId}`
  );
}

module.exports.get = async (ctx) => {
  const storage = await getStorageClient(ctx);
  let result = await storage.get(storagePath);
  if (result && result.data) {
    module.exports.teamToHandler = result.data;
    mappingTimestamp = Date.now();
    etag = result.etag;
  }
};

module.exports.put = async (ctx, applyChanges) => {
  const storage = await getStorageClient(ctx);

  while (true) {
    // TODO Maybe add some backoff?

    if (typeof applyChanges === 'function') {
      applyChanges();
    }

    try {
      const payload = {
        data: {
          teamToHandler: module.exports.teamToHandler,
        },
      };
      if (etag) {
        payload.etag = etag;
      }
      const response = await storage.put(payload, storagePath);
      etag = response.etag;
      break;
    } catch (e) {
      if (e.statusCode && e.statusCode == 409) {
        Sdk.debug('Cache conflict');

        // Local copy is stale, need to refresh
        await module.exports.get();
      } else {
        throw e;
      }
    }
  }
};

module.exports.ensureCache = async (ctx) => {
  // If no in-memory cache present, or the cache is older than the TTL,
  // reload from storage
  if (!module.exports.teamToHandler || mappingTimestamp < Date.now() - cacheTTL) {
    await module.exports.get(ctx);

    // If storage has never been used before, initialize things
    if (!module.exports.teamToHandler) {
      module.exports.teamToHandler = {};
      await module.exports.put(ctx);
    }
  }
};
