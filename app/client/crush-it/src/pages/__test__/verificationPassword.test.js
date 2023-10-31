import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import VerificationEmail from '../VerificationEmail'; // Assuming the component name is VerificationEmail

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

describe('VerificationEmail Component', () => {
  it('renders the VerificationEmail component', () => {
    render(<VerificationEmail />);
    
    const title = screen.getByText('Verification Email');
    expect(title).toBeInTheDocument();
  });

  it('submits the form with valid email', async () => {
    render(<VerificationEmail />);
    
    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'jlp4@njit.edu' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ data: { message: 'Verification link sent successfully to your email.' } }),
    });

    await waitFor(() => {
      expect(screen.getByText('Verification link sent successfully to your email.')).toBeInTheDocument();
    });
  });

  it('displays an error message for invalid email', async () => {
    render(<VerificationEmail />);
    
    const emailInput = screen.getByPlaceholderText('Enter Your Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve({ error: 'Invalid email format' }),
    });

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
  });
});