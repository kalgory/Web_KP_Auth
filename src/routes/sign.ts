import * as express from 'express';
import * as passport from 'passport';

function signController() {
  const signInController = (req: express.Request, res: express.Response) => {
    console.log(req.session);
    res.send();
  };

  return { signInController };
}

function signRoute(app: express.Application) {
  const { signInController } = signController();
  app.post('/sign-in', passport.authenticate('local'), signInController);
}

export default signRoute;
