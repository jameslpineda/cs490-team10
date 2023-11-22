export const defaultTaskPropsValues = {
  _id: undefined as string | undefined,
  user_id: '',
  name: '',
  status: undefined as string | undefined,
  timers: 1,
  notes: '',
  priority: 'Other',
  date: '',
};

export type TaskProps = Partial<typeof defaultTaskPropsValues>;

export interface taskModalProps {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (taskData: TaskProps) => void;
}
