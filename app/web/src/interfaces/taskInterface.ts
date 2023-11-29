import { Moment } from 'moment';

// export const defaultTaskPropsValues = {
//   _id: undefined,
//   user_id: '',
//   name: '',
//   status: undefined,
//   timers: 1,
//   notes: '',
//   priority: 'Other',
//   completed_timers: 0,
//   date: '',
// };

// export type TaskProps = Omit<
//   typeof defaultTaskPropsValues,
//   '_id' | 'status'
// > & {
//   _id?: string;
//   status?: string;
// };

export type TaskProps = {
  _id: string;
  user_id: string;
  name: string;
  status: string;
  timers: number;
  notes: string;
  priority: string;
  completed_timers: number;
  date: string;
};

export interface taskModalProps {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (taskData: TaskProps) => void;
  date: Moment;
}

export interface TaskCardProps {
  tasks: TaskProps[];
}
