import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: 'John',
    },
    last_name: {
      type: String,
      default: 'Doe',
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pomodoro: {
      type: Number,
      default: 25,
    },
    short_break: {
      type: Number,
      default: 5,
    },
    long_break: {
      type: Number,
      default: 15,
    },
    resetPasswordToken: String,
    resetPasswordExpireTime: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema);
