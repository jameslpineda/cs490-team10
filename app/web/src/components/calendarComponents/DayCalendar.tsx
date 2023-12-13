import React, { useCallback } from 'react';
import moment from 'moment';
import Calendar from './Calendar';
import { Event } from '../../interfaces/eventInterface';

interface DayCalendarProps {
  date: string;
  events: Event[];
}

const DayCalendar: React.FC<DayCalendarProps> = ({ date, events }) => {
  const slotPropGetter = useCallback(
    (date: moment.MomentInput) => ({
      className: 'rbc-label',
      ...(moment(date).hour() == moment().hour() && {
        style: {
          color: '#6284ff',
        },
      }),
    }),
    [],
  );

  return (
    <Calendar
      events={events}
      toolbar={false}
      defaultView="day"
      slotPropGetter={slotPropGetter}
      min={moment(date + 'T05:00:00').toDate()}
      max={moment(date + 'T20:59:00').toDate()}
      defaultDate={moment(date).toDate()}
    />
  );
};

export default DayCalendar;
