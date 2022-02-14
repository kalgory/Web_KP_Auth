import 'module-alias/register';
import * as express from 'express';
import loaderInit from 'src/loaders';

const app: express.Application = express();

loaderInit(app);
