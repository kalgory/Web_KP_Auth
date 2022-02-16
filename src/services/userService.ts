import { User } from 'src/models';

function userService() {
  function findUserById(userId: string) {
    return User.findOne({ userId });
  }

  return { findUserById };
}

export default userService();
