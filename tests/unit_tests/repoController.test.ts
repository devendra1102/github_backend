import { RequestError } from '@octokit/request-error';
import RepoController from '../../controllers/repos';
import { IRepo } from '../../interfaces/repo';
import { IBranch } from '../../interfaces/branch';

const repoController = new RepoController();

describe("tests for checking functionality of getRepos function", () => {
    it('should throw error if invalid userid is provided', async () => {
        await(expect(repoController.getRepos('somefakeUserid')).rejects.toThrow(RequestError));
    });

    it('should return all repos of user if valid userid is provided', async () => {
        const repos : IRepo[] = await repoController.getRepos('devendra1102');
        repos.forEach(repo => {
            expect(repo).toHaveProperty('repoName');
            expect(repo).toHaveProperty('ownerLogin');
            expect(repo).toHaveProperty('branches');
        });
    });
});

describe("checking the functionality of getBranches function", () => {
    it('should return all branches of a repo', async () => {
        const branches : IBranch[] = await repoController.getBranches('devendra1102', 'github_backend');
        branches.forEach(branch => {
            expect(branch).toHaveProperty('branchName');
            expect(branch).toHaveProperty('lastCommit');
        });
    });
});