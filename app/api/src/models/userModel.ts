import mongoose, { InferSchemaType, model } from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
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
    first_name: {
      type: String,
      default: null,
    },
    last_name: {
      type: String,
      default: null,
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
    verification_token: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    reset_password_token: {
      type: String,
      default: null,
    },
    reset_password_expire_time: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

type User = InferSchemaType<typeof UserSchema>;

export default model<User>('User', UserSchema);
