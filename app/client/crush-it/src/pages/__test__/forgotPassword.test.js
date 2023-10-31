import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ForgotPassword from '../forgotPassword';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUsedNavigate
}));

describe('ForgotPassword Component', () => {
  it('renders the ForgotPassword component', () => {
    render(<ForgotPassword />);
    
    const title = screen.getByText('Forgot Password');
    expect(title).toBeInTheDocument();
  });

  it('submits the form with valid email', async () => {
    render(<ForgotPassword />);
    
    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'jlp4@njit.edu' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { message: 'Password reset link sent successfully to your email.' } }),
    });

    await waitFor(() => {
      expect(screen.getByText('Password reset link sent successfully to your email.')).toBeInTheDocument();
    });
  });
  it('displays an error message for invalid email', async () => {
    render(<ForgotPassword />);
    
    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'Invalid email format' }),
    });

  });
});
