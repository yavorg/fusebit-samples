const request = require('request');

const org = 'fivequarters';
const projectNumber = 1;
const column = 'Backlog';

function requestGithub(context, method, uri, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  
  options.headers = options.headers || {};
  options.headers['Authorization'] = `token ${context.configuration.GITHUB_ACCESS_TOKEN}`;
  options.headers['User-Agent'] = '5qrts-Github-automation';
  options.headers['Accept'] = 'application/vnd.github.inertia-preview+json';
  if (options.body) {
    options.body = JSON.stringify(options.body)
  }
  request[method](uri, options, cb);
}

function getProjectId(context, cb) {
  requestGithub(
    context,
    'get',
    `https://api.github.com/orgs/${org}/projects`,
    (error, response, body) => {
    if (error) return cb(error);
    
    if (body) {
      const data = JSON.parse(body);
      if (data.length) {
        for (const item of data) {
          if (item.number === projectNumber) {
            return cb(null, item.id);
          }
        }
      }
    }
  
    cb(new Error(`Unable to find project number ${projectNumber}`));
  })  
}

function getColumnId(context, projectId, cb) {
  requestGithub(
    context,
    'get',
    `https://api.github.com/projects/${projectId}/columns`,
    (error, response, body) => {
    if (error) return cb(error);
    
    if (body) {
      const data = JSON.parse(body);
      if (data.length) {
        for (const item of data) {
          if (item.name === column) {
            return cb(null, item.id);
          }
        }
      }
    }
  
    cb(new Error(`Unable to find the '${column}' column`));
  });
}

function createCard(context, columnId, issueId, cb) {
  const options = {
    body: {
      content_type: 'Issue',
      content_id: issueId
    }
  };
  
  requestGithub(
    context,
    'post',
    `https://api.github.com/projects/columns/${columnId}/cards`,
    options,
    (error, response, body) => {
      console.log(body);
      cb(error)
    });
}

/**
* @param ctx {FusebitContext}
* @param cb {FusebitCallback}
*/
module.exports = (context, cb) => {
  let issueId = null;
  const body = context.body;
  if (body && body.action && body.action === 'opened' && body.issue) {
    issueId = body.issue.id;
  }
  
  if (issueId) {
    return getProjectId(context, (error, projectId) => {
      if (error) return cb(error);
      
      getColumnId(context, projectId, (error2, columnId) => {
        if (error2) return cb(error2);
 
        createCard(context, columnId, issueId, error3 => {
          if (error3) return cb(error3);
          
          cb(null, {msg: 'Issue assigned to project'});
        });
      });
    })
  }

  cb(null, { msg: 'no issueId'});
  
}