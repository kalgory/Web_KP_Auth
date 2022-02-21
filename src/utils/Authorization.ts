import * as bcrypt from 'bcrypt';

class Authorization {
  cookieOption = {
    maxAge: Number(process.env.COOKIE_MAX_AGE!),
    httpOnly: true,
    secure: process.env.MODE !== 'development',
    domain: process.env.COOKIE_DOMAIN,
  };

  compareHashPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}

export default new Authorization();
