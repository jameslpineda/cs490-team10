import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './scroll.css';
import TaskModal from '../components/TaskModal';
import Task from '../components/Task';
import { coreConfig } from '../utils/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import crushItLogo from '../images/crush_it_logo.png';
import useAppDispatch from '../features/auth/hooks/useAppDispatch';
import { TaskProps } from '../interfaces/taskInterface';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      let userUsername;
      if (userObject.first_name === null || userObject.last_name === null) {
        userUsername = userObject.email;
      } else {
        userUsername = userObject.first_name + ' ' + userObject.last_name;
      }
      setUsername(userUsername);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (task: TaskProps) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    closeModal();
    // TODO: Add logic to post the task to the backend
    // TODO: Use fetch for this purpose
    fetch(`${coreConfig.apiBaseUrl}/tasks/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // Handle the success response from the server
        console.log('Task created successfully:', data);
      })
      .catch((error) => {
        // Handle errors during the fetch or server-side errors
        console.error('Error creating task:', error.message);
      });
  };

  const [date, setDate] = useState(moment());
  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const monthNames = [];
  for (let i = 0; i < 12; i++) {
    const monthName = moment().month(i).format('MMMM');
    monthNames.push(monthName);
  }

  const daysInMonth = date.daysInMonth();
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const allYears = [];
  for (let y = 2000; y <= 2050; y++) {
    allYears.push(y);
  }

  const refreshView = async (newDate: moment.Moment) => {
    try {
      const queryParams = new URLSearchParams({
        date: JSON.stringify(newDate),
      });

      const url = `${coreConfig.apiBaseUrl}/task/retrieve?${queryParams}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const tasks = await response.json();
    } catch (error) {
      console.error(error);
      toast.error('Could not update tasks', { autoClose: 7000 });
    }
  };

  const updateDate = (newDate: moment.Moment) => {
    refreshView(newDate);
    setDate(newDate);
  };

  const decrementMonth = () => {
    const currDate = date.clone();
    if (currDate.year() == 2000 && currDate.month() == 0) {
      return;
    } else {
      updateDate(date.clone().subtract(1, 'month'));
    }
  };

  const incrementMonth = () => {
    const currDate = date.clone();
    if (currDate.year() == 2500 && currDate.month() == 11) {
      return;
    } else {
      updateDate(date.clone().add(1, 'month'));
    }
  };

  const decrementDay = () => {
    const currDate = date.clone();
    if (
      currDate.year() == 2000 &&
      currDate.month() == 0 &&
      currDate.date() == 1
    ) {
      return;
    } else {
      updateDate(date.clone().subtract(1, 'day'));
    }
  };

  const incrementDay = () => {
    const currDate = date.clone();
    if (
      currDate.year() == 2050 &&
      currDate.month() == 11 &&
      currDate.date() == 31
    ) {
      return;
    } else {
      updateDate(date.clone().add(1, 'day'));
    }
  };

  const decrementYear = () => {
    if (date.clone().year() > 2000) {
      updateDate(date.clone().subtract(1, 'year'));
    }
  };

  const incrementYear = () => {
    if (date.clone().year() < 2050) {
      updateDate(date.clone().add(1, 'year'));
    }
  };

  const navigate = useNavigate();
  const routeSettings = () => {
    navigate('../settings');
  };

  const dispatch = useAppDispatch();
  const routeLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('../');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('../');
    }
  }, [user, navigate]);

  return (
    <div
      className="flex"
      onClick={() => {
        showMonth && setShowMonth(false);
        showDay && setShowDay(false);
        showYear && setShowYear(false);
      }}
    >
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
              src={crushItLogo}
              alt="Crush It Image"
            />
          </div>
          <div className="flex justify-center">
            <p className="w-1/2 text-lg text-white font-semibold text-center">
              It&apos;s time to plan your day!
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
            {username}
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
                onClick={() => setShowMonth(!false)}
                data-testid="monthID"
                className={`relative border border-indigo-400 w-40 p-1.5 pl-3 rounded-md font-semibold text-s text-left ${
                  showMonth ? 'bg-white' : ''
                } `}
              >
                <span className="text-black font-bold flex justify-between items-center">
                  <p>{date.format('MMMM')}</p>
                  {showMonth ? (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M16 14.75C15.9015 14.7505 15.8038 14.7313 15.7128 14.6935C15.6218 14.6557 15.5393 14.6001 15.47 14.53L12 11.06L8.53003 14.53C8.38785 14.6625 8.19981 14.7346 8.00551 14.7312C7.81121 14.7278 7.62582 14.649 7.48841 14.5116C7.35099 14.3742 7.27228 14.1888 7.26885 13.9945C7.26543 13.8002 7.33755 13.6122 7.47003 13.47L11.47 9.47001C11.6107 9.32956 11.8013 9.25067 12 9.25067C12.1988 9.25067 12.3894 9.32956 12.53 9.47001L16.53 13.47C16.6705 13.6106 16.7494 13.8013 16.7494 14C16.7494 14.1988 16.6705 14.3894 16.53 14.53C16.4608 14.6001 16.3782 14.6557 16.2872 14.6935C16.1962 14.7313 16.0986 14.7505 16 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M12 14.75C11.9015 14.7505 11.8038 14.7313 11.7128 14.6935C11.6218 14.6557 11.5392 14.6001 11.47 14.53L7.47 10.53C7.33752 10.3879 7.2654 10.1998 7.26882 10.0055C7.27225 9.81121 7.35096 9.62582 7.48838 9.48841C7.62579 9.351 7.81118 9.27228 8.00548 9.26885C8.19978 9.26543 8.38782 9.33755 8.53 9.47003L12 12.94L15.47 9.47003C15.6122 9.33755 15.8002 9.26543 15.9945 9.26885C16.1888 9.27228 16.3742 9.351 16.5116 9.48841C16.649 9.62582 16.7277 9.81121 16.7312 10.0055C16.7346 10.1998 16.6625 10.3879 16.53 10.53L12.53 14.53C12.4608 14.6001 12.3782 14.6557 12.2872 14.6935C12.1962 14.7313 12.0985 14.7505 12 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  )}
                </span>
                {showMonth && (
                  <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-indigo-400">
                    <select
                      size={5}
                      className=" text-black w-full outline-none myScroll"
                      value={date.format('MMMM')}
                      onChange={(e) => {
                        updateDate(date.clone().month(e.target.value));
                        setShowMonth(false);
                      }}
                    >
                      {monthNames.map((month) => {
                        return (
                          <option
                            className="bg-white cursor-pointer py-1.5"
                            key={month}
                            value={month}
                          >
                            {month}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
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
                onClick={() => setShowDay(!false)}
                data-testid="dayID"
                className={`relative border border-indigo-400 w-16 p-1.5 pl-3 rounded-md font-semibold text-s text-left ${
                  showDay ? 'bg-white' : ''
                }`}
              >
                <span className="text-black font-bold flex justify-between  items-center">
                  <p>{date.format('D')}</p>
                  {showDay ? (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M16 14.75C15.9015 14.7505 15.8038 14.7313 15.7128 14.6935C15.6218 14.6557 15.5393 14.6001 15.47 14.53L12 11.06L8.53003 14.53C8.38785 14.6625 8.19981 14.7346 8.00551 14.7312C7.81121 14.7278 7.62582 14.649 7.48841 14.5116C7.35099 14.3742 7.27228 14.1888 7.26885 13.9945C7.26543 13.8002 7.33755 13.6122 7.47003 13.47L11.47 9.47001C11.6107 9.32956 11.8013 9.25067 12 9.25067C12.1988 9.25067 12.3894 9.32956 12.53 9.47001L16.53 13.47C16.6705 13.6106 16.7494 13.8013 16.7494 14C16.7494 14.1988 16.6705 14.3894 16.53 14.53C16.4608 14.6001 16.3782 14.6557 16.2872 14.6935C16.1962 14.7313 16.0986 14.7505 16 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M12 14.75C11.9015 14.7505 11.8038 14.7313 11.7128 14.6935C11.6218 14.6557 11.5392 14.6001 11.47 14.53L7.47 10.53C7.33752 10.3879 7.2654 10.1998 7.26882 10.0055C7.27225 9.81121 7.35096 9.62582 7.48838 9.48841C7.62579 9.351 7.81118 9.27228 8.00548 9.26885C8.19978 9.26543 8.38782 9.33755 8.53 9.47003L12 12.94L15.47 9.47003C15.6122 9.33755 15.8002 9.26543 15.9945 9.26885C16.1888 9.27228 16.3742 9.351 16.5116 9.48841C16.649 9.62582 16.7277 9.81121 16.7312 10.0055C16.7346 10.1998 16.6625 10.3879 16.53 10.53L12.53 14.53C12.4608 14.6001 12.3782 14.6557 12.2872 14.6935C12.1962 14.7313 12.0985 14.7505 12 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  )}
                </span>
                {showDay && (
                  <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-indigo-400">
                    <select
                      size={5}
                      className=" text-black w-full outline-none pr-2 myScroll"
                      value={date.format('D')}
                      onChange={(e) => {
                        updateDate(date.clone().date(parseInt(e.target.value)));
                        setShowDay(false);
                      }}
                    >
                      {daysArray.map((day) => {
                        return (
                          <option
                            className="bg-white cursor-pointer py-1.5"
                            key={day}
                            value={day}
                          >
                            {day}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
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
                onClick={() => setShowYear(!false)}
                className={`relative border border-indigo-400 w-28 p-1.5 pl-3 rounded-md font-semibold text-s text-left ${
                  showYear ? 'bg-white' : ''
                }  `}
              >
                <span className="text-black font-bold flex justify-between  items-center">
                  <p data-testid="yearID">{date.format('YYYY')}</p>
                  {showYear ? (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M16 14.75C15.9015 14.7505 15.8038 14.7313 15.7128 14.6935C15.6218 14.6557 15.5393 14.6001 15.47 14.53L12 11.06L8.53003 14.53C8.38785 14.6625 8.19981 14.7346 8.00551 14.7312C7.81121 14.7278 7.62582 14.649 7.48841 14.5116C7.35099 14.3742 7.27228 14.1888 7.26885 13.9945C7.26543 13.8002 7.33755 13.6122 7.47003 13.47L11.47 9.47001C11.6107 9.32956 11.8013 9.25067 12 9.25067C12.1988 9.25067 12.3894 9.32956 12.53 9.47001L16.53 13.47C16.6705 13.6106 16.7494 13.8013 16.7494 14C16.7494 14.1988 16.6705 14.3894 16.53 14.53C16.4608 14.6001 16.3782 14.6557 16.2872 14.6935C16.1962 14.7313 16.0986 14.7505 16 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                      ></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
                          fill="#818cf8"
                        ></path>
                        <path
                          d="M12 14.75C11.9015 14.7505 11.8038 14.7313 11.7128 14.6935C11.6218 14.6557 11.5392 14.6001 11.47 14.53L7.47 10.53C7.33752 10.3879 7.2654 10.1998 7.26882 10.0055C7.27225 9.81121 7.35096 9.62582 7.48838 9.48841C7.62579 9.351 7.81118 9.27228 8.00548 9.26885C8.19978 9.26543 8.38782 9.33755 8.53 9.47003L12 12.94L15.47 9.47003C15.6122 9.33755 15.8002 9.26543 15.9945 9.26885C16.1888 9.27228 16.3742 9.351 16.5116 9.48841C16.649 9.62582 16.7277 9.81121 16.7312 10.0055C16.7346 10.1998 16.6625 10.3879 16.53 10.53L12.53 14.53C12.4608 14.6001 12.3782 14.6557 12.2872 14.6935C12.1962 14.7313 12.0985 14.7505 12 14.75Z"
                          fill="#818cf8"
                        ></path>
                      </g>
                    </svg>
                  )}
                </span>
                {showYear && (
                  <div className="absolute top-8 left-0 p-2 bg-white w-full rounded-b-md outline-none border-l border-b border-r border-indigo-400">
                    <select
                      size={5}
                      className=" text-black w-full outline-none pr-2 myScroll"
                      value={date.format('YYYY')}
                      onChange={(e) => {
                        updateDate(date.clone().year(parseInt(e.target.value)));
                        setShowDay(false);
                      }}
                    >
                      {allYears.map((year) => {
                        return (
                          <option
                            className="bg-white cursor-pointer p-1.5"
                            key={year}
                            value={year}
                          >
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
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
            <div className="flex pb-2">
              <h2 className="text-3xl font-bold pb-2 pr-2">Tasks</h2>
              <button onClick={openModal}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 39 39"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="19.5"
                    cy="19.5"
                    r="19.5"
                    fill="url(#paint0_linear_1521_35)"
                  />
                  <path
                    d="M13 19.5H26"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.5 26V13"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_1521_35"
                      x1="19.5"
                      y1="0"
                      x2="19.5"
                      y2="39"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#5D8EFF" />
                      <stop
                        offset="1"
                        stopColor="#3E6FE1"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </button>
              {isModalOpen && (
                <TaskModal
                  onClose={closeModal}
                  onSubmit={addTask}
                />
              )}
            </div>

            <div className="flex-1 flex-col flex-grow">
              <div className="flex-grow bg-white rounded-lg shadow-md">
                <div className="flex flex-col p-4">
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">
                      Top Priority
                    </h2>
                    {tasks
                      .filter((task) => task.priority === 'Top Priority')
                      .map((task, index) => (
                        <Task
                          key={index}
                          {...task}
                        />
                      ))}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">
                      Important
                    </h2>
                    {tasks
                      .filter((task) => task.priority === 'Important')
                      .map((task, index) => (
                        <Task
                          key={index}
                          {...task}
                        />
                      ))}
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">Other</h2>
                    {tasks
                      .filter((task) => task.priority === 'Other')
                      .map((task, index) => (
                        <Task
                          key={index}
                          {...task}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold pb-2">Appointment</h2>
            <div className="flex flex-col flex-grow">TODO Next Sprint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
