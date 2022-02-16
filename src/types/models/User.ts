import { Types } from 'mongoose';

interface UserType {
  _id?: Types.ObjectId;
  userId: string;
  password: string;
  username: string;
  profileImage: string;
  lastVisitedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// eslint-disable-next-line import/prefer-default-export
export { UserType };
