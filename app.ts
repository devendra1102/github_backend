
import express, { Express, NextFunction, Request, Response } from 'express';
import logging from './utils/logging';
import Router from './router';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { validateHeader } from './middlewares/headerValidation';

const NAMESPACE: string = 'Index';
const swaggerDoc = YAML.load('./swagger.yaml');

export default class App {
  httpServer: Express;

  constructor(){
    this.httpServer = express();

    /*Logging the request */
    this.httpServer.use((req: Request, res: Response, next: NextFunction) => {
      logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
        logging.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
      });
      next();
    });

    this.httpServer.use(validateHeader);

    new Router(this.httpServer);

    this.httpServer.use('/docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    
    this.httpServer.use((_req: Request, res: Response) => {
      res.statusCode = 404;
      return res.json({
          message: "Invalid url. Please use the correct url"
      });
    });
  }

  public Start = (port: string) => {
    return new Promise((resolve, reject) => {
      this.httpServer.listen(
        port,
        () => {
          resolve(port)
        })
        .on('error', (err: any) => reject(err));
    })
  }
}


