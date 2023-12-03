import React from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import { Date } from '../../interfaces/dateInterface';

const DayCalendar: React.FC<Date> = ({ date }) => {
  console.log('Date: ', date);
  const events = [
    //To be filled with Event objects from backend payload using rtk query
    {
      start: moment('2023-12-03' + 'T11:00:00').toDate(),
      end: moment('2023-12-03' + 'T11:00:00').toDate(),
      title: 'appontment 1',
    },
    {
      start: moment('2023-12-02' + 'T14:00:00').toDate(),
      end: moment('2023-12-02' + 'T15:30:00').toDate(),
      title: 'appointment 2',
    },
  ];

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
