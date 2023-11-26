import React, { useEffect, useState } from 'react';
import focusTimeInterface from '../interfaces/focusTimeInterface';
import Timer from './Timer';

const FocusTimeModal: React.FC<focusTimeInterface> = (focusTimeProps) => {
  const [finishTime, setFinishTime] = useState<string>();
  const [timerType, setTimerType] = useState<string>('pomo');
  //pomo timer here for use state
  const [timeInterval, setTimeInterval] = useState(10);
  const [completedPomo, setCompletedPomo] = useState(
    focusTimeProps.props.completed_timers,
  );

  const closeFocus = () => {
    focusTimeProps.showFocusTime(false);
  };

  const handleFinishTime = (value: string) => {
    setFinishTime(value);
  };

  const handleNumComplete = (value: number) => {
    setCompletedPomo(value);
  };

  useEffect(() => {}, [timerType]);

  return (
    <div className="bg-black bg-opacity-50 z-50 fixed inset-0 flex justify-center items-center">
      <div className="bg-white w-1/3 p-4 rounded-md">
        <div className="flex flex-row w-full">
          {timerType === 'pomo' ? (
            <div className="flex flex-col w-1/3 pt-2 font-medium text-indigo-500">
              Pomodoro
              <hr className="border-t-4 border-indigo-500 rounded-md w-10"></hr>
            </div>
          ) : (
            <div
              id="pomoDiv"
              className="flex flex-col w-1/3 pt-2 font-medium"
              onClick={() => {
                setTimerType('pomo');
                //add call here
                setTimeInterval(10);
              }}
            >
              Pomodoro
            </div>
          )}
          {timerType === 'short' ? (
            <div className="flex flex-col w-1/3 pt-2 font-medium text-indigo-500">
              Short Break
              <hr className="border-t-4 border-indigo-500 rounded-md w-10"></hr>
            </div>
          ) : (
            <div
              id="shortDiv"
              className="flex flex-col w-1/3 pt-2 font-medium"
              onClick={() => {
                setTimerType('short');
                //add call here
                setTimeInterval(8);
              }}
            >
              Short Break
            </div>
          )}
          {timerType === 'long' ? (
            <div className="flex flex-col w-5/12 pt-2 font-medium text-indigo-500">
              Long Break
              <hr className="border-t-4 border-indigo-500 rounded-md w-10"></hr>
            </div>
          ) : (
            <div
              id="longDiv"
              className="flex flex-col w-5/12 pt-2 font-medium"
              onClick={() => {
                setTimerType('long');
                //add call here
                setTimeInterval(5);
              }}
            >
              Long Break
            </div>
          )}
          <div className="w-1/12 text-right">
            <button
              className=""
              onClick={closeFocus}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  stroke="#AEB9C8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.16998 14.83L14.83 9.17"
                  stroke="#AEB9C8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.83 14.83L9.16998 9.17"
                  stroke="#AEB9C8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <Timer
          handleFinishTime={handleFinishTime}
          timeInterval={timeInterval}
          completedPomo={completedPomo}
          handleNumComplete={handleNumComplete}
          timerType={timerType}
          setTimerType={setTimerType}
          numTimers={focusTimeProps.props.timers}
        />
        <h1 className="text-xl font-semibold py-3">
          {focusTimeProps.props.name}
        </h1>
        <div className="bg-gray-100 rounded-md p-3">
          <div className="text-indigo-500 font-medium text-md">Notes: </div>
          <div className="text-sm">{focusTimeProps.props.notes}</div>
        </div>
        <div className="bg-gray-950 rounded-md p-3 justify-center items-center mt-3 border border-indigo-500 flex flex-row">
          <div className="text-white text-xl">Pomos:&nbsp;</div>
          <div className="text-indigo-500 pr-10 text-xl">
            {completedPomo}/{focusTimeProps.props.timers}
          </div>
          <div className="text-white text-xl">Finish At:&nbsp;</div>
          <div className="text-indigo-400 text-xl">{finishTime}</div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimeModal;
