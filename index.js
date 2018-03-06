"use strict";
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
    } else {
      gh = new GitHub({
        username: params.auth.user,
        password: params.auth.pwd
      });
    }

    const command = params.command;
    const options = params.options;

    switch (command) {
      case "listIssues":
        const issues = gh.getIssues(params.user, params.repo);
        issues.listIssues(options, (err, data, response) => { callback(err, data, response) });
        break;
    }

    function callback(err, data, response) {
      if (err) {
        const endOptions = {
          end: "error",
          messageLog: err,
          err_output: err,
          extra_output: response
        };
        _this.end(endOptions);
      } else {
        const endOptions = {
          end: "end",
          data_output: data,
          extra_output: response
        };
        _this.end(endOptions);
      }
    }
  }
}

module.exports = githubExecutor;
