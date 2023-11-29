import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import FocusTimeModal from '../../components/FocusTimeModal';
import mockStore from './mockStore';

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

    render(
      <Provider store={mockStore}>
        <FocusTimeModal {...mockFocusTimeProps} />
      </Provider>,
    );
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

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <FocusTimeModal {...mockFocusTimeProps} />
      </Provider>,
    );

    fireEvent.click(getByTestId('closeButton'));

    expect(mockFocusTimeProps.showFocusTime).toHaveBeenCalledWith(false);
  });
});
