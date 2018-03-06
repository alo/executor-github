"use strict";

// const Twit = require("twit");
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
      console.log('params', params);
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





    // getRepositoryIssues('Coderty', 'Segesa');

    // function getRepositoryIssues(user, repo, options) {
    //   const issues = gh.getIssues(user, repo);
    //   issues.listIssues({ "labels": "type: feature" }, (err, data, response) => {
    //     console.log(data.length);
    //   });
    //   // const issues = repo.listIssues({"assignee": "none"}, (err, data, response) => {
    //   // const issues = repo.listIssues({"since": "2018-03-06T16:00:00Z"}, (err, data, response) => {
    //   // const issues = repo.listIssues({"labels": "type: feature"}, (err, data, response) => {
    //   //   console.log(data.length);
    //   // });
    // }

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

    // let command = params.command;

    // switch(command) {
    //   case "update":
    //     T.post("statuses/update", { status: params.status }, (err, data, response) => callback(err, data, response));
    //     break;

    //   case "search":
    //     T.get("search/tweets", { q: params.query }, (err, data, response) => callback(err, data, response));
    //     break;

    //   case "followers":
    //     T.get("followers/ids", { screen_name: params.screen_name },  (err, data, response) => callback(err, data, response));
    //     break;

    //   case "retweet":
    //     T.post("statuses/retweet/:id", { id: params.tweet_id }, (err, data, response) => callback(err, data, response));
    //     break;

    //   case "direct":
    //     T.post("direct_messages/new", { screen_name: params.screen_name, text: params.textToSend }, (err, data, response) => callback(err, data, response));
    //     break;

    //   default:
    //     callback(new Error("Expected params not found"), null, null);
    //     break;
    // }

    // function callback(err, data, response) {
    //   if (err) {
    //     const endOptions = {
    //       end: "error",
    //       messageLog: err,
    //       err_output: err,
    //       extra_output: response
    //     };
    //     _this.end(endOptions);
    //   } else {
    //     const endOptions = {
    //       end: "end",
    //       data_output: data,
    //       extra_output: response
    //     };
    //     _this.end(endOptions);
    //   }
    // }
  }
}

module.exports = githubExecutor;
