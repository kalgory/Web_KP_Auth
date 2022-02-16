import * as express from 'express';
import * as passport from 'passport';

function passportLoader(app: express.Application): void {
  app.use(passport.initialize());
}

export default passportLoader;
