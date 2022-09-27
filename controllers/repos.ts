import { Request, Response, NextFunction } from 'express';
import { IRepo } from '../interfaces/repo';

const NAMESPACE = "Repos Controller";

const getRepos :  (req: Request, res: Response, next: NextFunction) => IRepo[] = (req: Request, res: Response, next: NextFunction) => {
    const demo = [{repoName : 'test', ownerLogin : 'test', branches : []}];
    return demo;
}