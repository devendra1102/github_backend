import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import { IError } from '../interfaces/error';
import { IRepo } from '../interfaces/repo';

const NAMESPACE : string = "Repos Controller";


const getRepos : (req: Request, res: Response, next: NextFunction) => void = async (req: Request, res: Response, next: NextFunction) => {
    const userid : string = req.params['userid'];
    try {
        /* Calling github api for fetching data */
        const { data, status } = await axios.get(`https://api.github.com/users/${userid}/repos`);

        /* Filtering out forked repos */
        const notForked : any = data.filter((repo: { [x: string]: any; }) => repo['fork']===false);

        /* For ech repo fetching all the branches */
        const finalResponsePromise : Promise<IRepo>[] = notForked.map(async (repo: { [x: string]: any}) => {
            const { data } = await axios.get(`https://api.github.com/repos/${userid}/${repo['name']}/branches`);
            const branches : {branchName : string, lastCommit : string} [] = data.map((branch : { [x: string]: any}) => {return { branchName : branch['name'], lastCommit : branch['commit']?.['sha']}});
            return ({repoName : repo['name'], ownerLogin : repo['owner']?.['login'], branches : branches});    
        })

        /* Waiting to get all branches for the repo */
        const response : IRepo[] = await Promise.all(finalResponsePromise);

        /* Returning the final response */
        return res.status(status).json(response);
    } catch (err : any) {
        const error : IError = {statusCode : err.response['status'], message : err.message};
        return res.status(err.response['status']).json(error);
    } 
}

export default { getRepos };