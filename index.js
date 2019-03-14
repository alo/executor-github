'use strict';
const GitHub = require('github-api');

const Execution = global.ExecutionClass;

class githubExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;
    let gh;

    if (params.auth.token) {
      gh = new GitHub({
        token: params.auth.token
      });
    } else if (params.auth.username) {
      gh = new GitHub({
        username: params.auth.username,
        password: params.auth.password
      });
    } else {
      gh = new GitHub();
    }

    const command = params.command;
    const options = params.options;

    switch (command) {
      case 'listIssues':
        let issues = gh.getIssues(params.user, params.repo);
        issues.listIssues(options, (err, data, response) => {
          const res = {
            length: data.length
          };
          callback(err, data.length, res);
        });
        break;
      case 'listReleases':
        let repo = gh.getRepo(params.user, params.repo);
        repo.listReleases((err, data, response) => {
          const res = {
            length: data.length
          };
          callback(err, data.length, res);
        });
        break;
      default:
        callback('Invalid option');
        break;
    }

    function callback(err, data, response) {
      if (err) {
        const endOptions = {
          end: 'error',
          messageLog: err,
          err_output: err
        };
        _this.end(endOptions);
      } else {
        const endOptions = {
          end: 'end',
          data_output: data,
          extra_output: response
        };
        _this.end(endOptions);
      }
    }
  }
}

module.exports = githubExecutor;
