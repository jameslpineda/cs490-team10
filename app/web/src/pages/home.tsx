import React, { useEffect, useState } from 'react';
import moment from 'moment';
import '../components/scroll.css';
import TaskModal from '../components/TaskModal';
import Task from '../components/Task';
import SideBar from '../components/SideBar';
import DateBar from '../components/DateBar';
import { coreConfig } from '../utils/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TaskProps } from '../interfaces/taskInterface';
import { getUserID } from '../services/userServices';
import { postTaskService } from '../services/taskServices';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [username, setUsername] = useState('');
  const [date, setDate] = useState(moment());

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      const token = userObject.token;

      fetch(`${coreConfig.apiBaseUrl}/user/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (
            data.first_name == null &&
            data.last_name == null &&
            username == ''
          ) {
            setUsername(data.email);
          } else {
            setUsername(data.first_name + ' ' + data.last_name);
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
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
    task.date = date.format('YYYY-MM-DD');
    task.user_id = getUserID();

    const tt: TaskProps = {
      user_id: '12345', // string
      name: 'My Task', // string
      timers: 2, // number
      status: 'Task has not yet started',
      _id: '12312321asdasd',
      notes: 'Some notes about the task', // string
      priority: 'High', // string
      date: '2023-11-17', // string
    };

    console.log(tt);

    postTaskService(task);
  };

  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);

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
      console.log(tasks);
    } catch (error) {
      console.error(error);
      toast.error('Could not update tasks', { autoClose: 7000 });
    }
  };

  const navigate = useNavigate();
  const routeSettings = () => {
    navigate('../settings');
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
      <div className="w-1/6">
        <SideBar />
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
