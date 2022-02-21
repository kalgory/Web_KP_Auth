import * as bcrypt from 'bcrypt';

function Authorization() {
  const cookieOption = {
    maxAge: Number(process.env.COOKIE_MAX_AGE!),
    httpOnly: true,
    secure: process.env.MODE !== 'development',
    domain: process.env.MAIN_DOMAIN,
  };

  function compareHashPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  return { cookieOption, compareHashPassword };
}

export default Authorization;
