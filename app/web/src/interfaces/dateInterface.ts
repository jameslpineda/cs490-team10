import React from 'react';
import moment from 'moment';

export interface DateProp {
  // eslint-disable-next-line no-unused-vars
  date: moment.Moment;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  showMonth: boolean;
  setShowMonth: React.Dispatch<React.SetStateAction<boolean>>;
  showDay: boolean;
  setShowDay: React.Dispatch<React.SetStateAction<boolean>>;
  showYear: boolean;
  setShowYear: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Date {
  date: string;
}
