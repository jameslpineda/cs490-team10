import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import IconCycleComponent from './IconCycleComponent';
import { TaskProps } from '../interfaces/taskInterface';
import FocusTimeModal from './FocusTimeModal';
import { useUpdateTaskMutation } from '../features/tasks/tasksApiSlice';

import { ReactComponent as DropdownIcon } from '../assets/svgs/task-dropdown-icon.svg';

const Task: React.FC<TaskProps> = (props) => {
  const [count, setCounter] = useState(props.timers);
  const [userNote, setNote] = useState(props.notes);

  const [extend, setExtend] = useState(false);
  const [isNoteReadOnly, setIsNoteReadOnly] = useState(true);
  const [editPomo, setEditPomo] = useState(false);
  const [focusTime, showFocusTime] = useState(false);

  const [updateTask] = useUpdateTaskMutation();

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props._id || '',
    data: props,
  });

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
    setEditPomo(!editPomo);
    toggleDisplay(dec);
    toggleDisplay(inc);
  }

  function incrementCount() {
    const newCount = +count + 1;
    setCounter(newCount);
    const updateParams = {
      timers: newCount,
    };
    updateTask({ id: props._id, taskPayload: updateParams });
  }
  function decrementCount() {
    const newCount = count - 1;
    if (newCount != 0) {
      setCounter(newCount);
    }
    const updateParams = {
      timers: newCount,
    };
    updateTask({ id: props._id, taskPayload: updateParams });
  }

  function noteButton() {
    if (isNoteReadOnly == false) {
      setIsNoteReadOnly(true);
      const updateParams = {
        notes: userNote,
      };
      updateTask({ id: props._id, taskPayload: updateParams });
    } else {
      setIsNoteReadOnly(false);
    }
  }

  const openFocus = () => {
    showFocusTime(true);
  };

  return (
    <div className="border bg-white px-3 py-2 mb-3 rounded-xl">
      <div className="flex pb-0.5">
        <IconCycleComponent {...props} />
        <button onClick={openFocus}>
          <h3 className="pl-1 text-lg text-primary font-semibold">
            {props.name}
          </h3>
        </button>
        {focusTime && (
          <FocusTimeModal
            showFocusTime={showFocusTime}
            props={props}
            setNote={setNote}
          />
        )}
        <div className="ml-auto flex">
          <button
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ cursor: 'grab' }}
            className="focus:outline-none"
          >
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
          </button>
          <button onClick={() => setExtend(!extend)}>
            {extend ? (
              <div className="transform rotate-180">
                <DropdownIcon />
              </div>
            ) : (
              <DropdownIcon />
            )}
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
                {editPomo ? (
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
                ) : (
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
                )}
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
