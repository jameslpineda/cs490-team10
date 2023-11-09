import { ObjectId } from 'mongodb';

export type TaskInterface = {
  _id?: ObjectId;
  user_id?: ObjectId;
  name?: string;
  status?: string;
  timers?: number;
  notes?: string | null;
  priority?: string;
  date?: string;
};
