import * as passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';
import { userService } from 'src/services';
import * as crypto from 'crypto';

function createSalt(): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (error, buffer) => {
      if (error) reject(error);
      resolve(buffer.toString('base64'));
    });
  });
}

function createPasswordHash(
  password: string,
  salt: string,
): Promise<{ hash: string; salt: string }> {
  return new Promise((resolve, reject) => {
    const iterations = process.env.HASH_INTERATIONS;
    if (typeof iterations === 'undefined' || Number.isNaN(iterations)) {
      reject(new Error('configuration error'));
    } else {
      crypto.pbkdf2(password, salt, parseInt(iterations, 10), 64, 'sha512', (error, hash) => {
        if (error) reject(error);
        resolve({ hash: hash.toString('base64'), salt });
      });
    }
  });
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

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  };
  passport.use('local', new Strategy(localStrategyOptions, verifyLocalUser));
}

export default passportLocalLoader;
