import { TaskProps } from './taskInterface';
import React from 'react';

interface focusTimeInterface {
  showFocusTime: React.Dispatch<React.SetStateAction<boolean>>;
  props: TaskProps;
  // eslint-disable-next-line no-unused-vars
  setNote: (value: string) => void;
}

export default focusTimeInterface;
