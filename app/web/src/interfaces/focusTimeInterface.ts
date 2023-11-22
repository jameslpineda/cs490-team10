import { TaskProps } from './taskInterface';
import React from 'react';

interface focusTimeInterface {
  showFocusTime: React.Dispatch<React.SetStateAction<boolean>>;
  props: TaskProps;
}

export default focusTimeInterface;
