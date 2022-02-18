import * as express from 'express';
import * as passport from 'passport';

function passportLoader(app: express.Application): void {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('로그인 성공');
    done(null, { username: user.username, profileImage: user.profileImage });
  });
  passport.deserializeUser((user, done) => {
    console.log('재 접근');
    done(null, false);
  });
}

export default passportLoader;
