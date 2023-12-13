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
import { useGetTasksQuery } from '../features/tasks/tasksApiSlice';
import '../components/calendarComponents/calendar.css';
import AddButtonSvg from '../components/buttons/addButtonSvg';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(moment());

  const { data: tasks, isSuccess } = useGetTasksQuery(
    date.format('YYYY-MM-DD'),
  );

  let content = <TaskList tasks={[]} />;

  if (isSuccess) {
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
            <div className="flex pb-4">
              <div className="flex flex-row space-x-3 content-center">
                <h2 className="text-3xl font-bold">Tasks</h2>
                <button
                  onClick={openModal}
                  className="w-[2.4375rem] h-[2.4375rem]"
                >
                  <AddButtonSvg />
                </button>
              </div>
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
