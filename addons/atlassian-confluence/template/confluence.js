/**
 * @param confluence {ConfluenceSDK} OpenAPI-based Confluence client
 * @param ctx {FusebitContext} Fusebit operation context
 */
module.exports = async (confluence, ctx) => {
    if(confluence.accessibleResources.length < 1){
        return {body: []}
    } else {
        // Assume there is only one Confluence site in this instance
        confluence.setResource(confluence.accessibleResources[0].id); 
       
        // Reference https://developer.atlassian.com/cloud/confluence/swagger.v3.json

        // Get the space by the name provided in config
        let space = (await confluence.Space.getSpaces()).body.results.filter(
            space => space.name === ctx.space_name
        );

        if(space.length < 1){
            return {body: []}
        } else {
            return { body : (await confluence.Content.getContent({spaceKey: space[0].key})).body.results }
        }
    }
  
}