import { UserType } from 'src/types/models/User';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<UserType>(
  {
    userId: { type: String, trim: true, unique: true },
    password: { type: String, trim: true },
    lastVisitedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

const User = model<UserType>('User', userSchema);

export default User;