/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { constants } from 'buffer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const months: { [key: number]: [string, number] } = {
    0: ['January', 31],
    1: ['February', 28],
    2: ['March', 31],
    3: ['April', 30],
    4: ['May', 31],
    5: ['June', 30],
    6: ['July', 31],
    7: ['August', 31],
    8: ['September', 30],
    9: ['October', 31],
    10: ['November', 30],
    11: ['December', 31],
  };

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [day, setDay] = useState(today.getDate());

  function decrementMonth() {
    let nextMonth = month - 1;
    if (nextMonth < 0) {
      nextMonth = 11;
      decrementYear();
    }
    setMonth(nextMonth);
    return nextMonth;
  }

  function incrementMonth() {
    let nextMonth = month + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      incrementYear();
    }
    setMonth(nextMonth);
  }

  function decrementDay() {
    const nextDay = day - 1;
    if (nextDay < 1) {
      const prevMonth = decrementMonth();
      if (months[prevMonth][0] == 'February' && year % 4 == 0 && day == 1) {
        setDay(29);
      } else {
        setDay(months[prevMonth][1]);
      }
    } else {
      setDay(nextDay);
    }
  }
  function incrementDay() {
    const nextDay = day + 1;
    if (nextDay > months[month][1]) {
      if (months[month][0] == 'February' && year % 4 == 0 && day == 28) {
        setDay(29);
      } else {
        incrementMonth();
        setDay(1);
      }
    } else {
      setDay(nextDay);
    }
  }

  function decrementYear() {
    if (year > 2000) {
      setYear(year - 1);
    }
  }

  function incrementYear() {
    if (year < 2050) {
      setYear(year + 1);
    }
  }

  const navigate = useNavigate();
  const routeSettings = () => {
    navigate('../settings');
  };
  const routeLogout = () => {
    navigate('../signIn');
  };
  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-1/6 bg-gray-900">
        <div className="h-5/6">
          <h2 className="text-2xl text-white pt-10 font-semibold text-center">
            Crush It
          </h2>
          <div className="flex justify-center py-4">
            <hr className="border-gray-600 w-2/3"></hr>
          </div>
          <div className="flex justify-center pt-8 pb-4">
            <img
              className="w-13 h-13"
              src={process.env.PUBLIC_URL + '/image1.png'}
              alt="Crush It Image"
            />
          </div>
          <div className="flex justify-center">
            <p className="w-1/2 text-lg text-white font-semibold text-center">
              It's time to plan your day!
            </p>
          </div>
          <div className="flex justify-center items-center pb-20 mb-5">
            <div className="flex space-x-6 pt-4">
              <button
                className="shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-gray-800 font-semibold py-2 px-8 rounded-md"
                type="button"
              >
                Plan Day
              </button>
            </div>
          </div>
        </div>
        <div className="h-1/6 flex-grow flex justify-center items-center">
          <button
            onClick={routeLogout}
            className="flex shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-red-500 text-sm py-1 px-4 rounded-md"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
      <div className="w-5/6 bg-gray-100 h-screen">
        <div className="bg-white flex p-4">
          <div className="flex-grow"></div>
          <button
            onClick={routeSettings}
            data-testid="name"
            className="flex p-2 text-black border border-black hover:bg-gray-100 font-semibold rounded-md"
          >
            John Doe
          </button>
        </div>
        <div className="bg-gray-100">
          <div className="flex justify-center space-x-4 p-2 m-4 bg-indigo-100 rounded-2xl">
            <div>
              <button
                data-testid="decrement-month-button"
                onClick={decrementMonth}
                className="border border-indigo-400 p-1.5 rounded-md mr-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&lt;&ensp;
                </div>
              </button>
              <button
                data-testid="monthID"
                className="border border-indigo-400 w-40 p-1.5 pl-3 rounded-md font-semibold text-s text-left"
              >
                {months[month][0]}
              </button>
              <button
                data-testid="increment-month-button"
                onClick={incrementMonth}
                className="border border-indigo-400 p-1.5 rounded-md ml-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&gt;&ensp;
                </div>
              </button>
            </div>
            <div>
              <button
                data-testid="decrement-day-button"
                onClick={decrementDay}
                className="border border-indigo-400 p-1.5 rounded-md mr-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&lt;&ensp;
                </div>
              </button>
              <button
                data-testid="dayID"
                className="border border-indigo-400 w-16 p-1.5 pl-3 rounded-md font-semibold text-s text-left"
              >
                {day}
              </button>
              <button
                data-testid="increment-day-button"
                onClick={incrementDay}
                className="border border-indigo-400 p-1.5 rounded-md ml-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&gt;&ensp;
                </div>
              </button>
            </div>
            <div className="flex">
              <button
                data-testid="decrement-year-button"
                onClick={decrementYear}
                className="border border-indigo-400 p-1.5 rounded-md mr-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&lt;&ensp;
                </div>
              </button>
              <button
                data-testid="yearID"
                className="border border-indigo-400 w-28 p-1.5 pl-3 rounded-md font-semibold text-s text-left"
              >
                {year}
              </button>
              <button
                data-testid="increment-year-button"
                onClick={incrementYear}
                className="border border-indigo-400 p-1.5 rounded-md ml-1"
              >
                <div className="rounded-full bg-indigo-400 text-indigo-100 text-s">
                  &ensp;&gt;&ensp;
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold">Task</h2>
            <div className="flex-1 flex-col flex-grow">
              <div className="flex-grow bg-white rounded-lg shadow-md">
                <div className="flex flex-col p-4">
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">
                      Top Priority
                    </h2>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">
                      Important
                    </h2>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">Other</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold">Appointment</h2>
            <div className="flex flex-col flex-grow">TODO Next Sprint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
