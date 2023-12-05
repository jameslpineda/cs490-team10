import React from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import { Date } from '../../interfaces/dateInterface';
import { useGetEventsQuery } from '../../features/appointments/appointmentsApiSlice';
import { Event, GoogleCalendarEvent } from '../../interfaces/eventInterface';
import { toast } from 'react-toastify';

const DayCalendar: React.FC<Date> = ({ date }) => {
  const { data, isSuccess, isError } = useGetEventsQuery(date);

  let events: Event[] = [];
  if (isError) {
    toast.error(`Authorize Google Calendar in Settings`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
    });
  } else if (isSuccess) {
    events = data.events.map((gEvent: GoogleCalendarEvent) => {
      return {
        title: gEvent.title,
        description: gEvent.description,
        start: moment(gEvent.start).toDate(),
        end: moment(gEvent.end).toDate(),
      };
    });
  }

  return (
    <Calendar
      events={events}
      toolbar={false}
      defaultView="day"
      min={moment(date + 'T05:00:00').toDate()}
      max={moment(date + 'T20:59:00').toDate()}
      date={moment(date).toDate()}
    />
  );
};

export default DayCalendar;
