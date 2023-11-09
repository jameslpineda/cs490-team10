import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { coreConfig } from '../utils/config';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = document.getElementById('email') as HTMLInputElement;
    const r = /^[\w-]+@[\w-]+.[\w-]+$/;

    if (!r.test(email.value)) {
      toast.error('Invalid Email', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
      });
      return;
    }

    // Define the regex pattern for the password
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    // Check if the password not matches the regex pattern
    if (!passwordPattern.test(password)) {
      toast.error(
        'Must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 12 chars',
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
        },
      );
      return; // Stop the function here
    }

    // Check if the password and confirm password match
    if (password === confirmPassword) {
      try {
        await fetch(`${coreConfig.apiBaseUrl}/api/register/register-user`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        toast.success('Verification Email Sent!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error('User with this email already exists!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
          });
        } else {
          toast.error('Registration Failed', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
          });
        }
      }
    } else {
      toast.error('Passwords do not match!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-4 text-left">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Email/username
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </span>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePasswordVisibility}
            className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
          >
            {showPassword ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </span>
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 w-1/2">
            Sign Up
          </button>
        </div>
        <div className="flex w-full justify-center">
          <div className="flex w-96 bg-gray-300 justify-center rounded-xl p-3 mt-40">
            Already have an account?&nbsp;
            <Link
              to="/signIn"
              className="text-sky-700"
            >
              Sign in here!
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
