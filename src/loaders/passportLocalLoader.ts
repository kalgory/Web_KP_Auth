import * as passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { userService } from 'src/services';
import * as crypto from 'crypto';

function createPasswordHash(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const iterations = process.env.HASH_INTERATIONS;
    if (typeof iterations === 'undefined' || Number.isNaN(iterations)) {
      reject(new Error('configuration error'));
    } else {
      crypto.pbkdf2(password, salt, parseInt(iterations, 10), 64, 'sha512', (error, hash) => {
        if (error) reject(error);
        resolve(hash.toString('base64'));
      });
    }
  });
}

async function compareHashPassword(
  password: string,
  { hash, salt }: { hash: string; salt: string },
) {
  const newHash = await createPasswordHash(password, salt);
  return newHash === hash;
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
      const isValidPassword = await compareHashPassword(password, user.password);
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
