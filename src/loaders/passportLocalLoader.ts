import * as passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { userService } from 'src/services';

function passportLocalLoader() {
  type DoneFunction = (error: any, user?: any, options?: IVerifyOptions) => void;

  const localStrategyOptions = {
    usernameField: 'userId',
    passwordField: 'password',
    session: true,
  };
  const verifyLocalUser = async (userId: string, password: string, done: DoneFunction) => {
    try {
      const user = await userService.findUserById(userId);
      if (!user) {
        return done(null, false, { message: '존재하지 않는 유저입니다.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };
  passport.use('local', new Strategy(localStrategyOptions, verifyLocalUser));
}

export default passportLocalLoader;
