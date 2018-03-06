# Github executor for [Runnerty]:

### Methods:
* Configuration sample. We can config it via user and password or via token:
```json
{
  "id": "github_default",
  "type": "@runnerty-executor-github",
  "auth":{
    "token": "MY_TOKEN_HERE"
  }
}
```
or 

```json
{
  "id": "github_default",
  "type": "@runnerty-executor-github",
  "auth":{
    "username": "MY_USERNAME",
    "password": "MY_PASSWORD",
  }
}
```


* Plan sample to list issues of a repository filtering by label and update date: 
```json
{
  "id": "github_default",
  "command": "listIssues",
  "user": "runnerty",
  "repo": "runnerty",
  "options": {
    "labels": "bug",
    "since": "2018-03-06T16:00:00Z"
  }
}
```

Options:

| Name | Type | Description |
|---|---|---|
| milestone | integer or string| If an integer is passed, it should refer to a milestone by its number field. If the string * is passed, issues with any milestone are accepted. If the string none is passed, issues without milestones are returned |
| state | string | Indicates the state of the issues to return. Can be either open, closed, or all. Default: open  |
| assignee | string  | Can be the name of a user. Pass in none for issues with no assigned user, and * for issues assigned to any user.|
| creator | string  | The user that created the issue. |
| mentioned | string  | A user that's mentioned in the issue. |
| labels | string  | A list of comma separated label names. Example: bug,ui,@high |
| sort | string  | string	What to sort results by. Can be either created, updated, comments. Default: created |
| direction | string  | The direction of the sort. Can be either asc or desc. Default: desc |
| since | string  | Only issues updated at or after this time are returned. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. |


[Runnerty]: http://www.runnerty.io