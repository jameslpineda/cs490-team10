import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import DateBar from '../../components/DateBar'; // Adjust the path accordingly

describe('DateBar component', () => {
  test('renders DateBar component', () => {
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

    // Test your assertions here
    expect(screen.getByTestId('decrement-month-button')).toBeInTheDocument();
    expect(screen.getByTestId('monthID')).toBeInTheDocument();
    expect(screen.getByTestId('increment-month-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-day-button')).toBeInTheDocument();
    expect(screen.getByTestId('dayID')).toBeInTheDocument();
    expect(screen.getByTestId('increment-day-button')).toBeInTheDocument();
    expect(screen.getByTestId('decrement-year-button')).toBeInTheDocument();
    expect(screen.getByTestId('yearID')).toBeInTheDocument();
    expect(screen.getByTestId('increment-year-button')).toBeInTheDocument();
  });

  // Add more tests as needed for user interactions and state changes
});
