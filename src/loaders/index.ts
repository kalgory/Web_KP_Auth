import * as express from 'express';
import * as dotenv from 'dotenv';

import serverLoader from 'src/loaders/serverLoader';
import expressLoader from 'src/loaders/expressLoader';
import redisLoader from 'src/loaders/redisLoader';
import passportLoader from 'src/loaders/passportLoader';
import mongooseLoader from 'src/loaders/mongooseLoader';

dotenv.config();

function loaders(app: express.Application) {
  serverLoader(app);
  expressLoader(app);
  redisLoader(app);
  mongooseLoader();
  passportLoader(app);
}

export default loaders;
