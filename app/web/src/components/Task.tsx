import React, { useState } from 'react';
import IconCycleComponent from './IconCycleComponent';
import { TaskProps } from '../interfaces/taskInterface';
import { updateTask } from '../services/taskServices';

const Task: React.FC<TaskProps> = (props) => {
  const [extend, setExtend] = useState(false);
  const [count, setCounter] = useState(props.timers);
  const [userNote, setNote] = useState(props.notes);
  const [isNoteReadOnly, setIsNoteReadOnly] = useState(true);

  function pomoButtons() {
    const dec = document.getElementById('pomoDec') as HTMLElement;
    const inc = document.getElementById('pomoInc') as HTMLElement;

    function toggleDisplay(element: HTMLElement) {
      const isDisplayStyleSet =
        element.style.display && element.style.display !== 'none';
      const computedStyle = window.getComputedStyle(element);
      const isComputedDisplayStyleSet =
        computedStyle.getPropertyValue('display') !== 'none';

      if (isDisplayStyleSet || isComputedDisplayStyleSet) {
        element.style.display = 'none';
      } else {
        element.style.display = 'block';
      }
    }

    toggleDisplay(dec);
    toggleDisplay(inc);
  }

  function incrementCount() {
    const newCount = +count + 1;
    setCounter(newCount);
    const newProps = { ...props };
    newProps.timers = newCount;
    newProps._id = props._id;
    updateTask(newProps);
  }

  function decrementCount() {
    const newCount = count - 1;
    if (newCount != 0) {
      setCounter(newCount);
    }
    const newProps = { ...props };
    newProps.timers = newCount;
    newProps._id = props._id;
    updateTask(newProps);
  }

  function noteButton() {
    if (isNoteReadOnly == false) {
      setIsNoteReadOnly(true);
      const newProps = { ...props };
      newProps.notes = userNote;
      newProps._id = props._id;
      updateTask(newProps);
    } else {
      setIsNoteReadOnly(false);
    }
  }

  return (
    <div className="border bg-white px-3 py-2 mb-1 rounded-xl">
      <div className="flex pb-0.5">
        <IconCycleComponent />
        <h3 className="pl-1 text-lg text-indigo-400 font-bold">{props.name}</h3>
        <div className="ml-auto flex">
          <svg
            className="pt-1.5"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.7129 8.89949L14.0654 10.7189C13.3129 11.5509 12.0226 10.4204 12.7945 9.56791L13.3084 9.00025H8.85736V13.3084L9.42502 12.7944C10.264 12.0334 11.4172 13.3037 10.576 14.0654L8.75744 15.712C8.54889 15.8974 8.2796 15.9998 8.00057 16C7.72154 16.0002 7.45213 15.898 7.24338 15.7128L5.424 14.0654C4.58165 13.3027 5.7366 12.034 6.57496 12.7944L7.14262 13.3084V9.00025H2.69154L3.20551 9.56791C3.98024 10.4236 2.67942 11.5424 1.93455 10.7189L0.287906 8.90032C0.102585 8.69175 0.000154445 8.42248 1.74514e-07 8.14347C-0.000154096 7.86446 0.101979 7.59507 0.287069 7.38629L1.93455 5.56694C2.6946 4.72671 3.96689 5.87698 3.20551 6.71789L2.69154 7.28555H7.14262V2.69164L6.57496 3.20559C5.73614 3.96637 4.58258 2.69643 5.424 1.93463L7.24255 0.288026C7.45109 0.102633 7.72038 0.000154457 7.99941 1.74459e-07C8.27845 -0.000154108 8.54785 0.102026 8.7566 0.287188L10.576 1.93462C11.4324 2.70997 10.2465 3.95019 9.42502 3.20558L8.85736 2.69163V7.28554H13.3084L12.7945 6.71788C12.0341 5.87804 13.3046 4.72513 14.0654 5.56693L15.7121 7.38545C15.8974 7.59402 15.9998 7.8633 16 8.14231C16.0001 8.42132 15.898 8.69071 15.7129 8.89949Z"
              fill="#292D32"
            />
          </svg>
          <button onClick={() => setExtend(!extend)}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99996 18.3333C14.6023 18.3333 18.3333 14.6024 18.3333 9.99999C18.3333 5.39762 14.6023 1.66666 9.99996 1.66666C5.39759 1.66666 1.66663 5.39762 1.66663 9.99999C1.66663 14.6024 5.39759 18.3333 9.99996 18.3333Z"
                stroke="#292D32"
                strokeWidth="1.2"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.05835 8.94998L10 11.8833L12.9417 8.94998"
                stroke="#292D32"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      {extend && (
        <span>
          <hr className="border-gray-300 pt-0.5"></hr>
          <div className="flex">
            <p className="text-sm text-gray-600">Number of Pomodoro Timers:</p>
            <p className="text-orange-400 text-sm ml-auto flex">
              <button
                onClick={() => {
                  decrementCount();
                }}
              >
                <svg
                  id="pomoDec"
                  className="pr-1 hidden"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66663 10H13.3333"
                    stroke="#9FA3A8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.49996 18.3334H12.5C16.6666 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6666 1.66669 12.5 1.66669H7.49996C3.33329 1.66669 1.66663 3.33335 1.66663 7.50002V12.5C1.66663 16.6667 3.33329 18.3334 7.49996 18.3334Z"
                    stroke="#9FA3A8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {count}
              <button
                onClick={() => {
                  incrementCount();
                }}
              >
                <svg
                  id="pomoInc"
                  className="pl-1 hidden"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66663 10H13.3333"
                    stroke="#9FA3A8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 13.3334V6.66669"
                    stroke="#9FA3A8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.49996 18.3334H12.5C16.6666 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6666 1.66669 12.5 1.66669H7.49996C3.33329 1.66669 1.66663 3.33335 1.66663 7.50002V12.5C1.66663 16.6667 3.33329 18.3334 7.49996 18.3334Z"
                    stroke="#9FA3A8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              &nbsp;&nbsp;
              <button
                onClick={() => {
                  pomoButtons();
                }}
              >
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
              </button>
            </p>
          </div>
          <div className="flex">
            <p className="text-sm text-gray-600">Note:</p>
            <button
              className="ml-auto"
              onClick={() => {
                noteButton();
              }}
            >
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
            </button>
          </div>
          <textarea
            readOnly={isNoteReadOnly}
            onChange={(evt) => setNote(evt.target.value)}
            id="note"
            value={userNote}
            className="text-sm font-semibold w-full"
          ></textarea>
        </span>
      )}
    </div>
  );
};

export default Task;
