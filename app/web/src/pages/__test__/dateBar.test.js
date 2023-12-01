import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import DateBar from '../../components/DateBar';
import { fireEvent } from '@testing-library/react';

describe('DateBar component', () => {
  test('renders DateBar with correct initial state', () => {
    const currentDate = moment('2023-11-29');
    const setDate = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={setDate}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={() => {}}
      />,
    );

    expect(screen.getByTestId('monthID')).toHaveTextContent('November');
    expect(screen.getByTestId('dayID')).toHaveTextContent('29');
    expect(screen.getByTestId('yearID')).toHaveTextContent('2023');
  });
});

describe('Increment button', () => {
  test('clicking increment-day-button calls setDate with the next day', () => {
    const currentDate = moment('2023-11-29');
    const setDate = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={setDate}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('increment-day-button'));
    const setDateArg = setDate.mock.calls[0][0];
    expect(setDateArg.isSame(moment('2023-11-30'), 'day')).toBe(true);
  });
});

describe('Decrement button', () => {
  test('clicking decrement-month-button calls setDate with the previous month', () => {
    const currentDate = moment('2023-11-29');
    const setDate = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={setDate}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('decrement-month-button'));
    const setDateArg = setDate.mock.calls[0][0];
    expect(setDateArg.isSame(moment('2023-10-29'), 'day')).toBe(true);
  });
});

describe('Year Dropdown', () => {
  test('clicking yearID calls setShowYear', () => {
    const currentDate = moment('2023-11-29');
    const setShowYear = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={() => {}}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={setShowYear}
      />,
    );

    fireEvent.click(screen.getByTestId('yearID'));
    expect(setShowYear).toHaveBeenCalled();
  });
});

describe('Checks Leap Year', () => {
  test('On a leap year, February 29th exist', () => {
    const currentDate = moment('2024-2-28');
    const setDate = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={setDate}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('increment-day-button'));
    const setDateArg = setDate.mock.calls[0][0];
    expect(setDateArg.isSame(moment('2024-2-29'), 'day')).toBe(true);
  });

  test('On a non-leap year, it jumps to March 1st and not Feb 29th', () => {
    const currentDate = moment('2023-2-28');
    const setDate = jest.fn();

    render(
      <DateBar
        date={currentDate}
        setDate={setDate}
        showMonth={false}
        setShowMonth={() => {}}
        showDay={false}
        setShowDay={() => {}}
        showYear={false}
        setShowYear={() => {}}
      />,
    );

    fireEvent.click(screen.getByTestId('increment-day-button'));
    const setDateArg = setDate.mock.calls[0][0];
    expect(setDateArg.isSame(moment('2023-3-1'), 'day')).toBe(true);
  });
});
