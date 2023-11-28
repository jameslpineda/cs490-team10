import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import moment from 'moment';
import timerInterface from '../interfaces/timerInterface';
//import { getPomo } from '../services/userServices';

const Timer: React.FC<timerInterface> = (props) => {
  const [remainingTime, setRemainingTime] = useState(props.timeInterval);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  // eslint-disable-next-line no-undef
  const tick: MutableRefObject<NodeJS.Timer | undefined> = useRef();

  useEffect(() => {
    setRemainingTime(props.timeInterval);
  }, [props.timeInterval, props.timerType]);

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      tick.current = setInterval(() => {
        setRemainingTime((prevRemainingTime) => {
          const newRemainingTime = prevRemainingTime - 1;
          if (newRemainingTime <= 0) {
            if (
              props.timerType === 'pomo' &&
              (props.completedPomo + 1) % 4 == 0
            ) {
              props.handleNumComplete(props.completedPomo + 1);
              // ruby send update completed timers
              const el = document.getElementById('longDiv') as HTMLElement;
              el.click();
            } else if (
              props.timerType === 'pomo' &&
              (props.completedPomo + 1) % 4 != 0
            ) {
              props.handleNumComplete(props.completedPomo + 1);
              //ruby send update completed timers
              const el = document.getElementById('shortDiv') as HTMLElement;
              el.click();
            } else {
              const el = document.getElementById('pomoDiv') as HTMLElement;
              el.click();
            }
            clearInterval(tick.current);
            setStart(!start);
          }
          return newRemainingTime > 0 ? newRemainingTime : 0;
        });
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    if (props.completedPomo == props.numTimers) {
      return;
    }
    if (start === false) {
      setStart(true);
      const now = moment();
      const endTime = now.clone().add(remainingTime, 'seconds');
      props.handleFinishTime(endTime.format('HH:mm'));
    } else {
      setStart(false);
      props.handleFinishTime('');
    }
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds: number) => {
    if (seconds == 0) {
      return '0:00';
    }
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return (
      mins.toString() +
      ':' +
      (seconds_ == 0
        ? '00'
        : seconds_ < 10
        ? '0' + seconds_.toString()
        : seconds_.toString())
    );
  };

  return (
    <div className="bg-gray-100 rounded-md pt-6 mt-2">
      <div className="flex text-8xl justify-center items-center font-semibold">
        {dispSecondsAsMins(remainingTime)}
      </div>
      <div className="flex justify-center items-center pb-6 mt-4">
        <button
          onClick={toggleStart}
          className="h-10 w-24 bg-indigo-500 text-white rounded-md font-medium"
        >
          {!start ? 'START' : 'PAUSE'}
        </button>
      </div>
    </div>
  );
};

export default Timer;
