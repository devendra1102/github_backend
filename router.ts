import express, { Request, Response } from 'express';
import RepoController from './controllers/repos';
import { IError } from './interfaces/error';
import { IRepo } from './interfaces/repo';

export default class Router {

    private repoController : RepoController;

    constructor(server : express.Express){
        this.repoController = new RepoController();
        const router = express.Router();

        router.get('/users/:userid/repos', async (req : Request, res : Response) => {
            try {
                const repos : IRepo[] = await this.repoController.getRepos(req.params["userid"]);
                res.statusCode = 200;
                return res.json(repos);
            }
            catch(err : any) {
                const error : IError = {statusCode : err.response['status'], message : err.message};
                res.statusCode = err.response['status'];
                return res.json(error);
            }
        });

        server.use(router);
    }
}