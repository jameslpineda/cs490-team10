import { ObjectId } from 'mongodb';

export type TaskInterface = {
  _id?: ObjectId | string;
  user_id?: ObjectId | string;
  name?: string;
  status?: string | { $nin: string[] };
  timers?: number;
  completed_timers?: number;
  notes?: string;
  priority?: string;
  date?: Date | string | { $gte: Date; $lt: Date };
};
