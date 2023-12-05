import React from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import { Event } from '../../interfaces/eventInterface';

interface DayCalendarProps {
  date: string;
  events: Event[];
}

const DayCalendar: React.FC<DayCalendarProps> = ({ date, events }) => {
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
