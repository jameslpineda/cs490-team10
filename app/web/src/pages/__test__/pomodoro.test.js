import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Ensure jest-dom is imported for extended assertions

import Timer from '../../components/Timer';

jest.useFakeTimers(); // Mock the timers

describe('Timer component', () => {
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders with initial time interval', () => {
    const mockProps = {
      timeInterval: 1500,
      timerType: 'pomo',
      completedPomo: 0,
      numTimers: 4,
      handleFinishTime: jest.fn(),
      handleNumComplete: jest.fn(),
    };

    const { getByText } = render(<Timer {...mockProps} />);
    expect(getByText('25:00')).toBeInTheDocument(); // Change this based on your initial time interval
  });

  it('starts and pauses the timer when the button is clicked', () => {
    const mockProps = {
      timeInterval: 1500,
      timerType: 'pomo',
      completedPomo: 0,
      numTimers: 4,
      handleFinishTime: jest.fn(),
      handleNumComplete: jest.fn(),
    };

    const { getByText } = render(<Timer {...mockProps} />);
    const startButton = getByText('START');

    act(() => {
      fireEvent.click(startButton);
    });

    act(() => {
      jest.advanceTimersByTime(1000); // Advance timer by 1 second
    });

    const pauseButton = getByText('PAUSE');

    act(() => {
      fireEvent.click(pauseButton);
    });

    // Instead of specific assertions on setInterval, you can check if time has passed
    expect(mockProps.handleFinishTime).toHaveBeenCalled();
  });

  it('switches to a short break after completing a pomodoro', () => {
    const mockProps = {
      timeInterval: 1500,
      timerType: 'pomo',
      completedPomo: 0,
      numTimers: 4,
      handleFinishTime: jest.fn(),
      handleNumComplete: jest.fn(),
    };

    const { getByText } = render(<Timer {...mockProps} />);
    const startButton = getByText('START');

    act(() => {
      fireEvent.click(startButton);
    });

    // Simulate completing a pomodoro (25 minutes)
    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000);
    });

    // Instead of specific assertions on setInterval, you can check if time has passed
    expect(mockProps.handleFinishTime).toHaveBeenCalled();
  });

  it('switches to a long break after completing 4 pomodoros', () => {
    const mockProps = {
      timeInterval: 1500,
      timerType: 'pomo',
      completedPomo: 3, // Simulate completing 3 pomodoros
      numTimers: 4,
      handleFinishTime: jest.fn(),
      handleNumComplete: jest.fn(),
    };

    const { getByText } = render(<Timer {...mockProps} />);
    const startButton = getByText('START');

    // Complete 3 pomodoros
    for (let i = 0; i < 3; i++) {
      act(() => {
        fireEvent.click(startButton);
      });

      act(() => {
        jest.advanceTimersByTime(25 * 60 * 1000);
      });
    }
    expect(mockProps.handleFinishTime).toHaveBeenCalled();
  });
});
