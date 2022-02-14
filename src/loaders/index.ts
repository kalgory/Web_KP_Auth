import * as express from 'express';
import * as dotenv from 'dotenv';

import serverLoader from 'src/loaders/serverLoader';
import expressLoader from 'src/loaders/expressLoader';

dotenv.config();

function loaders(app: express.Application) {
  serverLoader(app);
  expressLoader(app);
}

export default loaders;
