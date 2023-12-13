import React from 'react';
import { useGetEventsQuery } from './appointmentsApiSlice';
import { Moment } from 'moment';

import LoadingSpinner from '../../components/LoadingSpinner';

type AppointmentsProps = {
  date: Moment;
};

const Appointments = (props: AppointmentsProps) => {
  const { data, isLoading, isSuccess, isError } = useGetEventsQuery(
    props.date.format('YYYY-MM-DD'),
  );

  let content = <LoadingSpinner />;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isError) {
    content = (
      <div>Authorize Crush It to access Google Calendar in the settings</div>
    );
  } else if (isSuccess) {
    content = <div>{JSON.stringify(data.events)}</div>;
  }

  return content;
};

export default Appointments;
