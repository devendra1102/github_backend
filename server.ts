import app from "./app";
import logging from './utils/logging';
import dotenv from 'dotenv';

dotenv.config();

const port : string = process.env.SERVER_PORT || '1337';
const hostname : string = process.env.SERVER_HOSTNAME || 'localhost';

const NAMESPACE: string = 'Server';

const server = new app().Start(port)
  .then(port => logging.info(NAMESPACE, `Server is running ${hostname}:${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });

export default server;