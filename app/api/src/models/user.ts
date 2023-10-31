import { InferSchemaType, model, Schema } from 'mongoose';
// import { UserInterface } from '../interfaces/user';

const userSchema = new Schema(
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
  }
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
