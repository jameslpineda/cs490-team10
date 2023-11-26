interface timerInterface {
  // eslint-disable-next-line no-unused-vars
  handleFinishTime: (value: string) => void;
  timeInterval: number;
  // eslint-disable-next-line no-unused-vars
  handleNumComplete: (value: number) => void;
  completedPomo: number;
  timerType: string;
  // eslint-disable-next-line no-unused-vars
  setTimerType: (value: string) => void;
  numTimers: number;
}

export default timerInterface;
