import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Timer from '../../components/Timer';

jest.useFakeTimers();

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
    expect(getByText('25:00')).toBeInTheDocument();
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
      jest.useFakeTimers();
    });

    const pauseButton = getByText('PAUSE');

    act(() => {
      fireEvent.click(pauseButton);
    });

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

    act(() => {
      jest.useFakeTimers();
    });

    expect(mockProps.handleFinishTime).toHaveBeenCalled();
  });

  it('switches to a long break after completing 4 pomodoros', () => {
    const mockProps = {
      timeInterval: 1500,
      timerType: 'pomo',
      completedPomo: 3,
      numTimers: 4,
      handleFinishTime: jest.fn(),
      handleNumComplete: jest.fn(),
    };

    const { getByText } = render(<Timer {...mockProps} />);
    const startButton = getByText('START');

    for (let i = 0; i < 3; i++) {
      act(() => {
        fireEvent.click(startButton);
      });

      act(() => {
        jest.useFakeTimers();
      });
    }
    expect(mockProps.handleFinishTime).toHaveBeenCalled();
  });
});
