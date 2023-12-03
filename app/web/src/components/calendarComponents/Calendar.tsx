import React from 'react';
import {
  Calendar as BigCalendar,
  CalendarProps,
  momentLocalizer,
  Event,
} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export default function Calendar(props: Omit<CalendarProps, 'localizer'>) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      views={['day']}
      startAccessor="start"
      endAccessor="end"
      events={props.events as Event[]}
    />
  );
}
