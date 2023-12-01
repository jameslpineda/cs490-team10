import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCreateUserMutation } from '../features/user/userApiSlice';

import { ReactComponent as EyeIcon } from '../assets/svgs/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../assets/svgs/eye-slash.svg';

import {
  validateEmail,
  validatePassword,
  displayValidationError,
} from '../utils/validation';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [signUp, { isSuccess }] = useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      setEmail('');
      setPassword('');
      navigate('/');
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      displayValidationError('Invalid Email');
    } else if (!validatePassword(password)) {
      displayValidationError(
        'Password must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 8 chars',
      );
    } else if (password !== confirmPassword) {
      displayValidationError('New Password and Confirm Password do not match');
    } else {
      await signUp({ email, password });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-white rounded-lg p-8 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-left">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="flex text-sm font-medium mb-1 text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-5 h-5 pt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Email/Username
            </label>
            <input
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
              className="flex text-sm font-medium mb-1 text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-5 h-5 pt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
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
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </span>
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="flex text-sm font-medium mb-1 text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-5 h-5 pt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
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
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </span>
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 w-1/2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-96 bg-gray-300 justify-center rounded-xl p-3">
          Already have an account?&nbsp;
          <Link
            to="/"
            className="text-sky-700"
          >
            Sign in here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
