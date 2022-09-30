import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from "http";
import { IError } from "../interfaces/error";

export const validateHeader : (req: Request, res: Response, next: NextFunction) => void = (req: Request, res: Response, next: NextFunction) => {
    const headers : IncomingHttpHeaders = req.headers;
    if(headers['accept'] === 'application/xml'){
        const error : IError = {statusCode : 406, message : "Accept : 'application/xml' is not allowed in header"};
        res.statusCode = 406;
        return res.json(error);
    }
    next();
}