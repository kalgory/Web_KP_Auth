import * as express from 'express';
import * as dotenv from 'dotenv';
import serverLoader from 'src/loaders/serverLoader';

dotenv.config();

function loaders(app: express.Application) {
  serverLoader(app);
}

export default loaders;
