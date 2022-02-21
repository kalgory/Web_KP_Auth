import * as express from 'express';
import * as passport from 'passport';
import Authorization from 'src/utils/Authorization';

function signController() {
  const { cookieOption } = Authorization();

  const signInController = (req: express.Request, res: express.Response) => {
    res.cookie('session', req.session.id, cookieOption).send();
  };

  return { signInController };
}

function signRoute(app: express.Application) {
  const { signInController } = signController();
  app.post('/sign-in', passport.authenticate('local'), signInController);
}

export default signRoute;
