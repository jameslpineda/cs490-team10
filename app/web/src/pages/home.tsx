import React, { useState } from 'react';
import moment from 'moment';
import '../components/scroll.css';
import TaskModal from '../components/TaskModal';
import TaskList from '../components/TaskList';
import Appointments from '../components/Appointments';
import SideBar from '../components/SideBar';
import DateBar from '../components/DateBar';
import { useNavigate } from 'react-router-dom';
import { TaskProps } from '../interfaces/taskInterface';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { getUserID } from '../services/userServices';
import Spinner from '../components/Spinner';
import { useGetTasksQuery } from '../features/tasks/tasksApiSlice';
import '../components/calendarComponents/calendar.css';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(moment());

  const {
    data: tasks,
    isLoading,
    isSuccess,
  } = useGetTasksQuery(date.format('YYYY-MM-DD'));

  let content = <TaskList tasks={[]} />;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = <TaskList tasks={tasks} />;
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addTask = (task: TaskProps) => {
    task.date = date.format('YYYY-MM-DD');
    task.user_id = getUserID();
    closeModal();
  };

  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const user = useSelector(selectCurrentUser);
  const username =
    user.first_name || user.last_name
      ? `${user.first_name} ${user.last_name}`.trim()
      : user.email;

  const navigate = useNavigate();
  const routeSettings = () => {
    navigate('../settings');
  };

  return (
    <div
      className="flex"
      onClick={() => {
        showMonth && setShowMonth(false);
        showDay && setShowDay(false);
        showYear && setShowYear(false);
      }}
    >
      <div className="w-1/6">
        <SideBar date={date} />
      </div>
      <div className="w-5/6 bg-gray-100 h-screen">
        <div className="bg-white flex p-4">
          <div className="flex-grow"></div>
          <button
            onClick={routeSettings}
            data-testid="name"
            className="flex p-2 text-light-black text-sm border hover:bg-gray-100 font-bold rounded-md"
          >
            {username.toString()}
          </button>
        </div>
        <div className="bg-gray-100">
          <DateBar
            date={date}
            setDate={setDate}
            showMonth={showMonth}
            setShowMonth={setShowMonth}
            showDay={showDay}
            setShowDay={setShowDay}
            showYear={showYear}
            setShowYear={setShowYear}
          />
        </div>
        <div className="flex h-4/5">
          <div className="w-1/2 pl-4 h-7/8">
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
                  date={date}
                />
              )}
            </div>
            {content}
          </div>
          <div className="w-1/2 pl-4 pr-2 h-7/8">
            <h2 className="text-3xl font-bold pb-4">Appointments</h2>
            <Appointments date={date.format('YYYY-MM-DD')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
