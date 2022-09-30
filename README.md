# Github_backend

This api can be used for getting all the repos of a given user which are not forked. This api internallay uses [Octokit API](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api) for fetching the data.

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
| `accept` | `application/json` | If you send application/xml it will throw 406 error |

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

## Documentation

To provide documention for the API, `Swagger UI` integration is done. To access the documentation, start the application and hit the below url from browser
```http
http://localhost:1337/docs
```

## Authentication

It might be possible that you can get 403 error if you hit too many request. This is because github limits the number of requests. For overcome this issue you need to provide the personal access token(PAT) of Github. To generate the PAT you can follow [this documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). Once you get the PAT, uncomment the last line in `.env` file present in this repo and replace the text after `TOKEN=` with your PAT.

```.env
SERVER_PORT=1337
SERVER_HOSTNAME=localhost
#TOKEN=Generate your personal token(PAT) from github and replace here and uncomment line
```
## Docker deployment

To deploy application in Docker container, a `Dockerfile` is provided with the project. First you need to [install the Docker](https://docs.docker.com/get-docker/). After installing the Docker, start the Docker application. Once docker is up and running, go to the `root directory` of the repo run the below command to create the docker image

```bash
docker build . -t github_backend
```

It will take some time to create docker image based on your internet speed. Once docker image is made, you can run that image by below command

```bash
docker run -p 1337:1337 -d github_backend:latest
```

Once docker image is deployed, you can access the endpoint directly from postman and browser.
