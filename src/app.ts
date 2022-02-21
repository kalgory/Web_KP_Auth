import 'module-alias/register';
import * as express from 'express';
import loaderInit from 'src/loaders';
import routesInit from 'src/routes';

const app: express.Application = express();
loaderInit(app);
routesInit(app);
