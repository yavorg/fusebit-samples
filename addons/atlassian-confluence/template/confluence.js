module.exports = async (confluence, ctx) => {
    // Simple caching
    let storage = await ctx.storage.get();

    if (storage && storage.timestamp && storage.timestamp > Date.now() - 180000) {
        // We have a cache with TTL 3 min
        return { body: storage.body };
    } else {
        // Need to update the cache
        if (confluence.accessibleResources.length < 1) {
            return { body: [] };
        } else {
            // Assume there is only one Confluence site in this instance
            confluence.setResource(confluence.accessibleResources[0].id);

            // Reference https://developer.atlassian.com/cloud/confluence/swagger.v3.json

            // Get the space by the name provided in config
            let space = (await confluence.Space.getSpaces()).body.results.filter((space) => space.name === ctx.space_name);

            var result = [];
            if (space.length > 0) {
                result = (await confluence.Content.getContent({ spaceKey: space[0].key })).body.results;
            }

            // Cache result
            ctx.storage.put({ body: result, timestamp: Date.now() });

            // Return response
            return { body: result };
        }
    }
};
