import * as express from 'express';
import * as passport from 'passport';

function passportLoader(app: express.Application): void {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    // Session 생성 유저
    done(null, { username: user.username, profileImage: user.profileImage });
  });
  passport.deserializeUser((user, done) => {
    // Session 있는 유저 재접근
    // ttl 연장 로직 필요
    done(null, false);
  });
}

export default passportLoader;
