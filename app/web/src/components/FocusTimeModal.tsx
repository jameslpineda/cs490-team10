import React from 'react';
import focusTimeInterface from '../interfaces/focusTimeInterface';

const FocusTimeModal: React.FC<focusTimeInterface> = (focusTimeProps) => {
  const closeFocus = () => {
    focusTimeProps.showFocusTime(false);
  };

  return (
    <div className="bg-black bg-opacity-50 z-50 fixed inset-0 flex justify-center items-center">
      <div className="bg-white w-1/3 p-4 rounded-md">
        <div className="flex flex-row w-full">
          <div className="w-1/3 pt-2 font-medium">Pomodoro</div>
          <div className="w-1/3 pt-2 font-medium">Short Break</div>
          <div className="pt-2 w-5/12 font-medium">Long Break</div>
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
        <div className="bg-gray-100 rounded-md pt-6 mt-2">
          <div className="flex text-8xl justify-center items-center font-semibold">
            25:00
          </div>
          <div className="flex justify-center items-center pb-6 mt-4">
            <button className="h-10 w-24 bg-indigo-500 text-white rounded-md font-medium">
              Start
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-semibold py-4">
          {focusTimeProps.props.name}
        </h1>
        <div className="bg-gray-100 rounded-md p-3">
          <div className="text-indigo-500 font-medium text-md">Notes: </div>
          <div className="text-sm">{focusTimeProps.props.notes}</div>
        </div>
        <div className="bg-gray-950 rounded-md p-3 justify-center items-center mt-3 border border-indigo-500 flex flex-row">
          <div className="text-white text-xl">Pomos:&nbsp;</div>
          <div className="text-indigo-500 pr-10 text-xl">
            0/{focusTimeProps.props.timers}
          </div>
          <div className="text-white text-xl">Finish At:&nbsp;</div>
          <div className="text-indigo-400 text-xl">{}</div>
        </div>
      </div>
    </div>
  );
};

export default FocusTimeModal;
