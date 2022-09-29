import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import { IError } from "../interfaces/error";

export const validateHeader : (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    const headers : IncomingHttpHeaders = req.headers;
    if(!headers['accept']){
        const error : IError = {statusCode : 406, message : "accept : 'application/json' is missing in header"};
        res.statusCode = 406;
        return res.json(error);
    }

    if(headers['accept'] !== 'application/json'){
        const error : IError = {statusCode : 406, message : "Only accept : 'application/json' is allowed in header"};
        res.statusCode = 406;
        return res.json(error);
    }
    next();
}