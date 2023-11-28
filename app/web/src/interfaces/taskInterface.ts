import { Moment } from 'moment';

export const defaultTaskPropsValues = {
  _id: undefined,
  user_id: '',
  name: '',
  status: undefined,
  timers: 1,
  notes: '',
  priority: 'Other',
  completed_timers: 0,
  date: '',
};

export type TaskProps = Omit<
  typeof defaultTaskPropsValues,
  '_id' | 'status'
> & {
  _id?: string;
  status?: string;
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
