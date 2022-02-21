import * as express from 'express';
import * as passport from 'passport';

const cookieOption = {
  maxAge: process.env.COOKIE_AGE,
  secure: true,
  httpOnly: true,
};

function signController() {
  const signInController = (req: express.Request, res: express.Response) => {
    res.cookie('session', req.session.id);
  };

  return { signInController };
}

function signRoute(app: express.Application) {
  const { signInController } = signController();
  app.post('/sign-in', passport.authenticate('local'), signInController);
}

export default signRoute;
