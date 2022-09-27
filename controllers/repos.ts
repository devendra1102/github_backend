import { Request, Response, NextFunction } from 'express';
import { IRepo } from '../interfaces/repo';

const NAMESPACE : string = "Repos Controller";

const getRepos : (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    const demo = [{repoName : 'test', ownerLogin : 'test', branches : []}];
    return res.status(200).json({msg : "Hi"});
}

export default { getRepos };