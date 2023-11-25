import React, { useState, useEffect, useRef, MutableRefObject } from 'react';
import moment from 'moment';
import timerInterface from '../interfaces/timerInterface';
//import { getPomo } from '../services/userServices';

const Timer: React.FC<timerInterface> = ({ handleFinishTime }) => {
  const [remainingTime, setRemainingTime] = useState(1500);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  // eslint-disable-next-line no-undef
  const tick: MutableRefObject<NodeJS.Timer | undefined> = useRef();

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    if (start) {
      tick.current = setInterval(() => {
        setRemainingTime((remainingTime) => remainingTime - 1);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [start]);

  const toggleStart = () => {
    if (start === false) {
      setStart(true);
      const now = moment();
      const endTime = now.clone().add(remainingTime, 'seconds');
      handleFinishTime(endTime.format('HH:mm'));
    } else {
      setStart(false);
      handleFinishTime('');
    }
    setStart(!start);
  };

  const dispSecondsAsMins = (seconds: number) => {
    if (seconds < 0) {
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
