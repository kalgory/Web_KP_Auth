import 'module-alias/register';
import * as express from 'express';
import loaderInit from 'src/loaders';
import * as crypto from 'crypto';

const app: express.Application = express();

loaderInit(app);

console.log(crypto.randomBytes(64));
