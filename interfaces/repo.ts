export interface IRepo {
    repoName : string,
    ownerLogin : string,
    branches : {branchName : string, lastCommit : string}[]
}