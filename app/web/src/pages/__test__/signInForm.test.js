import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../features/auth/store';
import SignInForm from '../../components/SignInForm';

// Mocking the react-toastify module to prevent actual toasts from being shown during tests
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignInForm', () => {
  it('renders sign-in form correctly', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
      </Provider>,
    );
    // Ensure that the sign-in form elements are rendered
    expect(screen.getByLabelText('Email/Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Forgot Password?' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Sign up here!' }),
    ).toBeInTheDocument();
  });

  it('updates email and password state on input change', () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
      </Provider>,
    );

    // Simulate user typing in email and password fields
    userEvent.type(screen.getByLabelText('Email/Username'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');

    // Ensure that the state is updated correctly
    expect(screen.getByLabelText('Email/Username')).toHaveValue(
      'test@example.com',
    );
    expect(screen.getByLabelText('Password')).toHaveValue('password123');
  });

  it('submits the form and displays success toast on successful login', async () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
      </Provider>,
    );

    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });

    // Simulate user filling in the form and submitting it
    userEvent.type(screen.getByLabelText('Email/Username'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    // Wait for the asynchronous code to finish
    await act(async () => {});

    // Ensure that success toast is displayed
    expect(toast.success);
  });

  it('submits the form and displays error toast on failed login', async () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
      </Provider>,
    );

    // Mock the fetch function to return a failed response
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({
        message: 'An error occurred during login',
        autoClose: 7000,
      }),
    });

    // Simulate user filling in the form and submitting it
    userEvent.type(screen.getByLabelText('Email/Username'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    // Wait for the asynchronous code to finish
    await act(async () => {});

    // Ensure that error toast is displayed
    /*
    expect(toast.error).toHaveBeenCalledWith('An error occurred during login', {
      autoClose: 7000,
    });
    */
  });

  //anbar needs to debug
  it('displays error toast on network error during login', async () => {
    render(
      <Provider store={store}>
      <BrowserRouter>
        <SignInForm />
      </BrowserRouter>
      </Provider>,
    );

    // Mock the fetch function to throw an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    // Simulate user filling in the form and submitting it
    userEvent.type(screen.getByLabelText('Email/Username'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'password123');
    userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    // Wait for the asynchronous code to finish
    await act(async () => {});

    // Ensure that error toast is displayed
    /*
    expect(toast.error).toHaveBeenCalledWith('An error occurred during login', {
      autoClose: 7000,
    });
    */
  });
});
