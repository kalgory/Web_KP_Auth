import * as express from 'express';
import * as passport from 'passport';
import { Strategy, IVerifyOptions } from 'passport-local';

function passportLocalLoader(app: express.Application) {
  type DoneFunction = (error: any, user?: any, options?: IVerifyOptions) => void;

  const localStrategyOptions = {
    usernameField: 'userId',
    passwordField: 'password',
  };
  const verifyLocalUser = async (username: string, password: string, done: DoneFunction) => {};
}
