module.exports = async (jira, ctx) => {
  if (jira.accessibleResources.length < 1) {
    return { body: [] };
  } else {
    // Assume there is only one Jira instance in this account
    jira.setResource(jira.accessibleResources[0].id);

    // Reference https://bitbucket.org/atlassianlabs/node-jira

    const issues = await jira.search.searchForIssuesUsingJqlGet({
      jql: `project=${ctx.configuration.project_name}` 
    });

    // Return response
    return { body: issues};
  }
}
