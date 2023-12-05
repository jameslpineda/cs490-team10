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
  // Custom time format for the time gutter
  const customFormats = {
    timeGutterFormat: (date: Date) => moment(date).format('h A'), // Use moment directly to format the date
  };

  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      views={['day']}
      startAccessor="start"
      endAccessor="end"
      events={props.events as Event[]}
      formats={customFormats}
    />
  );
}
