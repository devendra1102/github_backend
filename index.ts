import http, { Server } from 'http';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import logging from './utils/logging';

dotenv.config();

const NAMESPACE: string = 'Index';
const app: Express = express();
const port : string = process.env.SERVER_PORT || '1337';
const hostname : string = process.env.SERVER_HOSTNAME || 'localhost';

const httpServer : Server = http.createServer(app);
httpServer.listen(port, () => logging.info(NAMESPACE, `Server is running ${hostname}:${port}`));