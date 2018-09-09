"use strict";
const GitHub = require("github-api");

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
        user: params.auth.user,
        password: params.auth.password
      });
    }

    const command = params.command;
    const options = params.options;
    let issues;

    switch (command) {
      case "listIssues":
        issues = gh.getIssues(params.user, params.repo);
        issues.listIssues(options, (err, data, response) => {
          callback(err, data, response);
        });
        break;
      default:
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
