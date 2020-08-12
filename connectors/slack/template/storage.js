const Sdk = require('@fusebit/add-on-sdk');

var storage;
module.exports.ensureStorage = (ctx) => {
    if(!storage){
        storage = Sdk.getStorageClient(ctx);
    } 
}

module.exports.appToHandler = null;
module.exports.tokenToApp = null;
var mappingTimestamp;
module.exports.get = async () => {   
    let result = await storage.get();
    module.exports.appToHandler = (result && result.appToHandler) || {};
    module.exports.tokenToApp = (result && result.tokenToApp) || {};
    mappingTimestamp = Date.now();
}

module.exports.put = async (applyChanges) => {
    let success = false;
    while(!success){
        
        // TODO Maybe add some backoff?

        applyChanges();

        try {
            await storage.put({
                appToHandler: module.exports.appToHandler,
                tokenToApp: module.exports.tokenToApp
            }, storage.etag);
            success = true;
        } catch(e){
            Sdk.debug('Cache conflict');
            if(e.statusCode && e.statusCode == 412){
                // Local copy is stale, need to refresh
                await storage.get()
            } else throw e;
        }
    }
 }

module.exports.ensureCache = async () => {
    // If no in-memory cache present, or the cache is more than 15 sec old,
    // reload from storage
    if(!module.exports.appToHandler || !module.exports.tokenToApp || 
        mappingTimestamp < Date.now() - 15000){        
        await module.exports.get();
    }
}