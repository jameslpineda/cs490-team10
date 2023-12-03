import React from 'react';
import { useGetEventsQuery } from './appointmentsApiSlice';
import { Moment } from 'moment';

import Spinner from '../../components/Spinner';

type AppointmentsProps = {
  date: Moment;
};

const Appointments = (props: AppointmentsProps) => {
  const { data, isLoading, isSuccess } = useGetEventsQuery(
    props.date.format('YYYY-MM-DD'),
  );

  let content = <Spinner />;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = <div>{JSON.stringify(data.events)}</div>;
  }

  return content;
};

export default Appointments;
