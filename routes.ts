import express, { Request, Response, Router } from 'express';
import RepoController from './controllers/repos';
import { IError } from './interfaces/error';
import { IRepo } from './interfaces/repo';

export const router : Router = express.Router();
const repoController = new RepoController();

router.get('/users/:userid/repos', async (req : Request, res : Response) => {
    try {
        const repos : IRepo[] = await repoController.getRepos(req.params["userid"]);
        res.statusCode = 200;
        return res.json(repos);
    }
    catch(err : any) {
        const error : IError = {statusCode : err.response['status'], message : err.message};
        res.statusCode = err.response['status'];
        return res.json(error);
    }

});