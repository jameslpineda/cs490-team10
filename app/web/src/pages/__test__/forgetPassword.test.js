/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from '../forgotPassword';
import { Provider } from 'react-redux';
import store from '../../features/auth/store';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe('ForgotPassword Component', () => {
  it('renders the ForgotPassword component', () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>,
    );

    const title = screen.getByText('Forgot Password');
    expect(title).toBeInTheDocument();
  });

  it('submits the form with valid email', async () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>,
    );

    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'jlp4@njit.edu' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          data: {
            message: 'Password reset link sent successfully to your email.',
          },
        }),
    });
  });
  it('displays an error message for invalid email', async () => {
    render(
      <Provider store={store}>
        <ForgotPassword />
      </Provider>,
    );
    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'Invalid email format' }),
    });
  });
});
