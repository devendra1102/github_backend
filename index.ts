import http, { Server } from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import logging from './utils/logging';
import {router} from './routes';
import { validateHeader } from './middlewares/headerValidation';

dotenv.config();

const NAMESPACE: string = 'Index';
const app: Express = express();
const port : string = process.env.SERVER_PORT || '1337';
const hostname : string = process.env.SERVER_HOSTNAME || 'localhost';

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

/* Create the server */
const httpServer : Server = http.createServer(app);
httpServer.listen(port, () => logging.info(NAMESPACE, `Server is running ${hostname}:${port}`));