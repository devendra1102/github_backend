import { IBranch } from '../interfaces/branch';
import { IRepo } from '../interfaces/repo';

import { Endpoints } from "@octokit/types";
import { Octokit } from 'octokit';

type listUserReposResponse =
  Endpoints["GET /users/{username}/repos"]["response"];
type listBranchesResponse = Endpoints["GET /repos/{owner}/{repo}/branches"]["response"];

const octokit = new Octokit({ auth: process.env.TOKEN });

export default class Repo {
    getRepos = async (userid : string)  : Promise<IRepo[]> => {
        try {
            const allRepos : listUserReposResponse = await octokit.request('GET /users/{username}/repos', { 
                username: userid 
            });
            const notForkedRepos : listUserReposResponse["data"] = allRepos["data"].filter((repo) => {
                return repo['fork']===false
            });
            
            const reposWithBranchDescription : Promise<IRepo>[]= notForkedRepos.map(async (repo) => {
                const allBrachesForRepo = await this.getBranches(userid, repo["name"]);
                return {
                    repoName : repo["name"],
                    ownerLogin : repo["owner"]?.["login"],
                    branches : allBrachesForRepo
                };
            });
            return Promise.all(reposWithBranchDescription);
        }
        catch(ex : any) {
            throw ex;
        }
    }

    getBranches = async (userid : string, repoName : string) : Promise<IBranch[]> => {
        try {
            const allBranchesOfRepo : listBranchesResponse = await octokit.request('GET /repos/{owner}/{repo}/branches', {
                owner: userid, repo : repoName
            });
            const relevantBranchDataOfRepo : IBranch[] = allBranchesOfRepo["data"].map((branch) => {
                return {branchName : branch["name"], lastCommit : branch["commit"]?.["sha"]};
            });
            return relevantBranchDataOfRepo;
        }
        catch(ex : any) {
            throw ex;
        }
    }
}

