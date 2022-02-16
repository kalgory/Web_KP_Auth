import { User } from 'src/models';

function userService() {
  function findUserById(userId: string) {
    return User.findOne({ userId });
  }
}

export default userService();
