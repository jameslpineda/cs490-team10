import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FocusTimeModal from '../../components/FocusTimeModal';

describe('FocusTimeModal', () => {
  it('renders without crashing', () => {
    const mockFocusTimeProps = {
      showFocusTime: jest.fn(),
      props: {
        name: 'Test Name',
        notes: 'Test Notes',
        timers: 3,
      },
    };

    render(<FocusTimeModal {...mockFocusTimeProps} />);
  });

  it('closes the modal when the close button is clicked', () => {
    const mockFocusTimeProps = {
      showFocusTime: jest.fn(),
      props: {
        name: 'Test Name',
        notes: 'Test Notes',
        timers: 3,
      },
    };

    const { getByTestId } = render(<FocusTimeModal {...mockFocusTimeProps} />);

    fireEvent.click(getByTestId('closeButton'));

    expect(mockFocusTimeProps.showFocusTime).toHaveBeenCalledWith(false);
  });
});
