# Github_backend

This api can be used for getting all the repos of a given user which are not forked. This api internallay uses [https://api.github.com/](https://api.github.com/) for fetching the data.

## Installation

Clone the repository

```bash
git clone https://github.com/devendra1102/github_backend
```

Go to the root of the repo and install required dependencies
```bash
npm install
```

Build the api
```bash
npm run build
```
Start the application
```bash
npm run start
```

Run the Test Suites
```bash
npm run test
```

## Usage

When application is up and running, go to Postman and hit the endpoint and replace `{username}` with valid username `eg : devendra1102`(There should be no curly braces {} in the url) and provide below header value

```http
GET http://localhost:1337/users/{username}/repos
```

| Header Parameter | value | Description |
| :--- | :--- | :--- |
| `accept` | `application/json` | **Required**. Without this header you will get 406 error |

## Responses

API returns the JSON response in below format.

```javascript
[{
  "repoName"    : string,
  "ownerLogin"  : string,
  "branches"    : [
    {
      "branchName" : string,
      "lastCommit" : string
    }
  ]
}]
```

However, if an invalid request is submitted, or some other error occurs, it will returns a JSON response in the following format:

```javascript
{
    "statusCode": number,
    "message": string
}
```

## Status Codes

API returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 404 | `NOT FOUND` |
| 406 | `NOT ACCEPTABLE` |
| 500 | `INTERNAL SERVER ERROR` |
