import { User } from 'src/models';

function userService() {
  function findUserByEmail(email: string) {
    return User.findOne({ email });
  }

  return { findUserByEmail };
}

export default userService();
