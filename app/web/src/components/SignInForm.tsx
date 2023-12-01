import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as EyeIcon } from '../assets/svgs/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../assets/svgs/eye-slash.svg';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useSignInMutation } from '../features/auth/authApiSlice';

import { validateEmail, displayValidationError } from '../utils/validation';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [signIn, { isLoading }] = useSignInMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      displayValidationError('Email and password are required');
    } else if (!validateEmail(email)) {
      displayValidationError('Invalid Email');
    } else {
      try {
        const { accessToken, user } = await signIn({
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ accessToken, user }));

        toast.success('Successful sign in!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
        });

        setEmail('');
        setPassword('');
        navigate('/home');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err?.data?.message) {
          toast.error(err.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
          });
        } else {
          toast.error('An unexpected error has occurred', {
            autoClose: 7000,
          });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="bg-white rounded-lg p-8 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-left">Sign In</h2>
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
              className="w-full p-2 border border-gray-400 rounded-xl focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="w-full p-2 border border-gray-400 rounded-xl focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
            >
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </span>
          </div>
          <div className="flex justify-center">
            <button className="btn-primary p-3 w-1/2">Sign In</button>
          </div>
        </form>
        <div className="flex justify-center mt-4 text-sm text-primary">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-96 bg-gray-300 justify-center rounded-xl p-3">
          Need an account?&nbsp;
          <Link
            to="/signUp"
            className="text-primary"
          >
            Sign up here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
