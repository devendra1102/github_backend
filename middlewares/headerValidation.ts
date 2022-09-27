import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import { IError } from "../interfaces/error";

export const validateHeader : (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    const headers : IncomingHttpHeaders = req.headers;
    if(headers['accept'] !== 'application/json'){
        const error : IError = {statusCode : 406, message : "Only accept : 'application/json' is allowed in header"};
        return res.status(406).send(error);
    }
    next();
}