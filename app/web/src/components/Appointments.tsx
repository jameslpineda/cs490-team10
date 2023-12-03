import React from 'react';
import DayCalendar from './calendarComponents/DayCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Date } from '../interfaces/dateInterface';
const Appointments: React.FC<Date> = ({ date }) => {
  return (
    <>
      <div className="h-full pb-16 flex-1 flex-col flex-grow">
        <div className="h-full pb-4 flex-1 flex-col flex-grow bg-white rounded-lg shadow-md">
          <div className="h-full flex flex-col p-4 overflow-y-auto">
            <DayCalendar date={date} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
