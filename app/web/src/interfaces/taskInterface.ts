export const defaultTaskPropsValues = {
  title: '',
  pomodoroCount: 1,
  note: '',
  priority: 'Other',
};

export type TaskProps = typeof defaultTaskPropsValues;

export interface taskModalProps {
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (taskData: TaskProps) => void;
}
