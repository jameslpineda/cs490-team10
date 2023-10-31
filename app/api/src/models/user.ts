import { model, Schema } from 'mongoose';
import { UserInterface } from '../interfaces/user';

const UserSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      unique: true,
      index: true,
    },
    resetPasswordToken: String,
    resetPasswordExpireTime: Number,
    password: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model<UserInterface>('user', UserSchema);
export { UserModel };
