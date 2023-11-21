import React, { useEffect, useState } from 'react';
import { TaskProps } from '../interfaces/taskInterface';
import { updateTask } from '../services/taskServices';

const IconCycleComponent: React.FC<TaskProps> = (props) => {
  const [clickCount, setClickCount] = useState<number>(0);

  useEffect(() => {
    const initialStatusIndex = statusIndices[props.status || 'Task is deleted'];
    setClickCount(initialStatusIndex || 0);
  }, [props.status]);

  const handleClick = () => {
    const newClickCount = (clickCount + 1) % icons.length; // Cycle through icons
    setClickCount(newClickCount);

    const newStatus = statusMapping[newClickCount];

    const newProps = {
      ...props,
      status: newStatus,
    };
    updateTask(newProps);
  };

  const statusMapping: { [key: number]: string } = {
    0: 'Task has not been started',
    1: 'Task is in progress',
    2: 'Task is complete',
    3: 'Task rolled over to the next day',
    4: 'Task is deleted',
  };

  const statusIndices: { [key: string]: number } = {
    'Task has not been started': 0,
    'Task is in progress': 1,
    'Task is complete': 2,
    'Task rolled over to the next day': 3,
    'Task is deleted': 4,
  };

  const icons: React.JSX.Element[] = [
    //not started
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
      key="Task has not been started"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    //in progress
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
      key="Task is in progress"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
    //complete
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      key="Task is complete"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75-9.75-4.365-9.75-9.75zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>,
    //rollover
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
      key="Task rolled over to the next day"
    >
      <path
        fillRule="evenodd"
        d="M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z"
        clipRule="evenodd"
      />
    </svg>,
    //delete
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
      key="Task is deleted"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>,
  ];

  return (
    <div
      className="icon-container pt-0.5"
      onClick={handleClick}
    >
      {icons[clickCount]}
    </div>
  );
};

export default IconCycleComponent;
