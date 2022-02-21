import * as passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { userService } from 'src/services';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

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
      if (typeof user.password === 'undefined') {
        return done(null, false, { message: '비밀번호 암호화 되지 않은 사용자입니다.' });
      }
      const isValidPassword = await comparePassword(password, user.password);
      if (isValidPassword) {
        return done(null, user);
      }
      return done(null, false, { message: '비밀번호가 유효하지 않습니다' });
    } catch (error) {
      return done(error, false);
    }
  };
  passport.use('local', new Strategy(localStrategyOptions, verifyLocalUser));
}

export default passportLocalLoader;
