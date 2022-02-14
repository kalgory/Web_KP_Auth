import 'module-alias/register';
import * as express from 'express';
import loaderInit from 'src/loaders';

const app: express.Application = express();

loaderInit(app);

app.get('/session', (req, res) => {
  console.log(req.session);
  req.session.test = '123';
  res.send();
});

app.get('/session_test', (req, res) => {
  console.log(req.session);
  res.send();
});
