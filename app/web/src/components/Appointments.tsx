import React, { useEffect } from 'react';
import DayCalendar from './calendarComponents/DayCalendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Date } from '../interfaces/dateInterface';
import { useGetEventsQuery } from '../features/appointments/appointmentsApiSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Event, GoogleCalendarEvent } from '../interfaces/eventInterface';

const Appointments: React.FC<Date> = ({ date }) => {
  const { data, isSuccess, isError } = useGetEventsQuery(date);

  useEffect(() => {
    if (isError) {
      toast.error(`Authorize Google Calendar in Settings`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: false,
      });
    }
  }, [isError]);

  let events: Event[] = [];

  if (isSuccess) {
    events = data.events.map((gEvent: GoogleCalendarEvent) => ({
      title: gEvent.title,
      description: gEvent.description,
      start: moment(gEvent.start).toDate(),
      end: moment(gEvent.end).toDate(),
    }));
    console.log(events);
  }

  return (
    <>
      <div className="h-full pb-16 flex-1 flex-col flex-grow">
        <div className="h-full pb-4 flex-1 flex-col flex-grow bg-white dark:bg-zinc-800 rounded-lg shadow-md">
          <div className="h-full flex flex-col p-4 overflow-y-auto">
            <DayCalendar
              date={date}
              events={events}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
