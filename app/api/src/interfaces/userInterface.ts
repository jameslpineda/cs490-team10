import { ObjectId } from 'mongodb';

export type UserInterface = {
  _id?: ObjectId;
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  pomodoro?: number;
  short_break?: number;
  long_break?: number;
  verification_token?: string;
  is_verified?: boolean;
  reset_password_token?: null | string;
  reset_password_expire_time?: null | number | { $gt: number };
};
