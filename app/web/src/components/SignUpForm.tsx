import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { coreConfig } from '../utils/config';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Define the regex pattern for the password
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    // Check if the password not matches the regex pattern
    if (!passwordPattern.test(password)) {
      toast.error(
        'Must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 12 chars',
        { position: toast.POSITION.TOP_RIGHT },
      );
      return; // Stop the function here
    }

    // Check if the password and confirm password match
    if (password === confirmPassword) {
      try {
        await axios.post(
          `${coreConfig.restApiUrl}/api/register/register-user`,
          {
            email,
            password,
          },
        );
        toast.success('Verification Email Sent!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          toast.error('User with this email already exists!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error('Registration Failed', {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    } else {
      toast.error('Passwords do not match!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
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
