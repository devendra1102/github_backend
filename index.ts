
import express, { Express, NextFunction, Request, Response } from 'express';
import logging from './utils/logging';
import {router} from './routes';
import { validateHeader } from './middlewares/headerValidation';



const NAMESPACE: string = 'Index';
export const app: Express = express();


/*Logging the request */
app.use((req: Request, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
  });
  next();
});

/* Validating header */
app.use(validateHeader);

/* Routes */
app.use('/', router);

/** Handling 404 headers */
app.use((_req: Request, res: Response) => {
  res.statusCode = 404;
  return res.json({
      message: "Invalid url. Please use the correct url"
  });
});


