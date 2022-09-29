import http, { Server } from "http";
import { app } from "./index";
import logging from './utils/logging';
import dotenv from 'dotenv';

dotenv.config();

const port : string = process.env.SERVER_PORT || '1337';
const hostname : string = process.env.SERVER_HOSTNAME || 'localhost';

const NAMESPACE: string = 'Server';

const httpServer : Server = http.createServer(app);
httpServer.listen(port, () => logging.info(NAMESPACE, `Server is running ${hostname}:${port}`));