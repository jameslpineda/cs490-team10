import React, { useState } from 'react';
import IconCycleComponent from './IconCycleComponent';

interface TaskProps {
  title: string;
  pomodoroCount: number;
  note: string;
  priority: string;
}

const Task: React.FC<TaskProps> = ({
  title,
  pomodoroCount,
  note,
  priority,
}) => {
  const [extend, setExtend] = useState(false);
  console.log(priority);
  return (
    <div className="border bg-white px-3 py-2 mb-1 rounded-xl">
      <div className="flex pb-0.5">
        <IconCycleComponent />
        <h3 className="pl-1 text-lg text-indigo-400 font-bold">{title}</h3>
        <svg
          className="pt-1 ml-auto"
          onClick={() => setExtend(!extend)}
          width="24"
          height="24"
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
      </div>
      {extend && (
        <span>
          <hr className="border-gray-300 pt-0.5"></hr>
          <p className="text-sm text-gray-600">
            Number of Pomodoro Timers: {pomodoroCount}
          </p>
          <p className="text-sm text-gray-600">Note:</p>
          <p className="text-sm font-semibold">{note}</p>
        </span>
      )}
    </div>
  );
};

export default Task;
