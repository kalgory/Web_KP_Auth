import * as express from 'express';
import * as passport from 'passport';

function passportLoader(app: express.Application): void {
  app.use(passport.initialize());
  app.use(passport.session());
}

export default passportLoader;
