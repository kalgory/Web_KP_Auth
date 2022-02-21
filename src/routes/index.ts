import * as express from 'express';
import signRoute from 'src/routes/sign';

function routesInit(app: express.Application) {
  signRoute(app);
}

export default routesInit;
