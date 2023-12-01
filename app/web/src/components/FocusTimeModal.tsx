import React, { useEffect, useState } from 'react';
import focusTimeInterface from '../interfaces/focusTimeInterface';
import Timer from './Timer';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useUpdateTaskMutation } from '../features/tasks/tasksApiSlice';

const FocusTimeModal: React.FC<focusTimeInterface> = (focusTimeProps) => {
  const userInfo = useSelector(selectCurrentUser);
  const [finishTime, setFinishTime] = useState<string>();
  const [timerType, setTimerType] = useState<string>('pomo');
  const [timeInterval, setTimeInterval] = useState(userInfo.pomodoro * 60);
  const [completedPomo, setCompletedPomo] = useState(
    focusTimeProps.props.completed_timers,
  );
  const [isNoteReadOnly, setIsNoteReadOnly] = useState(true);
  const [note, setNote] = useState(focusTimeProps.props.notes);

  const [updateTask] = useUpdateTaskMutation();

  function noteButton() {
    setIsNoteReadOnly((prevIsNoteReadOnly) => !prevIsNoteReadOnly);
    const updateParams = {
      notes: note,
    };
    updateTask({ id: focusTimeProps.props._id, taskPayload: updateParams });
  }

  const closeFocus = () => {
    const updateParams = {
      notes: note,
      completed_timers: completedPomo,
    };
    updateTask({ id: focusTimeProps.props._id, taskPayload: updateParams });

    focusTimeProps.showFocusTime(false);
  };

  const handleFinishTime = (value: string) => {
    setFinishTime(value);
  };

  const handleNumComplete = (value: number) => {
    setCompletedPomo(value);
    const updateParams = {
      completed_timers: value,
    };
    updateTask({ id: focusTimeProps.props._id, taskPayload: updateParams });
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
                setTimeInterval(userInfo.pomodoro * 60);
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
                setTimeInterval(userInfo.short_break * 60);
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
                setTimeInterval(userInfo.long_break * 60);
              }}
            >
              Long Break
            </div>
          )}
          <div className="w-1/12 text-right">
            <button
              className=""
              onClick={closeFocus}
              data-testid="closeButton"
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
          completedPomo={focusTimeProps.props.completed_timers}
          handleNumComplete={handleNumComplete}
          timerType={timerType}
          setTimerType={setTimerType}
          numTimers={focusTimeProps.props.timers}
        />
        <h1 className="text-xl font-semibold py-3">
          {focusTimeProps.props.name}
        </h1>
        <div className="bg-gray-100 rounded-md p-3">
          <div className="flex">
            <p className="text-indigo-500 font-medium text-md">Notes:</p>
            <button
              className="ml-auto"
              onClick={() => {
                noteButton();
              }}
            >
              {isNoteReadOnly ? (
                <svg
                  className="pl-1"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.83994 2.39997L3.36661 8.1933C3.15994 8.4133 2.95994 8.84664 2.91994 9.14664L2.67328 11.3066C2.58661 12.0866 3.14661 12.62 3.91994 12.4866L6.06661 12.12C6.36661 12.0666 6.78661 11.8466 6.99327 11.62L12.4666 5.82664C13.4133 4.82664 13.8399 3.68664 12.3666 2.2933C10.8999 0.913305 9.78661 1.39997 8.83994 2.39997Z"
                    stroke="#6284FF"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.92664 3.36667C8.2133 5.20667 9.70664 6.61334 11.56 6.8"
                    stroke="#6284FF"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 14.6667H14"
                    stroke="#6284FF"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <div className="border border-primary rounded-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="text-primary"
                    style={{ fill: 'currentColor' }}
                    viewBox="0 0 24 24"
                  >
                    <path d="M0 11c2.761.575 6.312 1.688 9 3.438 3.157-4.23 8.828-8.187 15-11.438-5.861 5.775-10.711 12.328-14 18.917-2.651-3.766-5.547-7.271-10-10.917z" />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <div className="text-sm">
            <textarea
              readOnly={isNoteReadOnly}
              onChange={(evt) => {
                focusTimeProps.setNote(evt.target.value);
                setNote(evt.target.value);
              }}
              id="note"
              value={note}
              className="text-sm font-semibold w-full bg-gray-100"
            ></textarea>
          </div>
        </div>
        <div className="bg-gray-900 rounded-md p-3 justify-center items-center mt-3 border border-secondary flex flex-row font-bold">
          <div className="text-white text-xl">Pomos:&nbsp;</div>
          <div className="text-secondary pr-10 text-xl">
            {completedPomo}/{focusTimeProps.props.timers}
          </div>
          <div className="text-white text-xl">Finish At:&nbsp;</div>
          <div className="text-primary text-xl">{finishTime}</div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimeModal;
