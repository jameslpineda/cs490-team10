import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import {
  useUpdateUserMutation,
  UserPayload,
} from '../features/user/userApiSlice';
import { selectCurrentUser } from '../features/auth/authSlice';

import { ReactComponent as EyeIcon } from '../assets/svgs/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../assets/svgs/eye-slash.svg';

import {
  validateName,
  validatePassword,
  validateTimer,
  displayValidationError,
} from '../utils/validation';

import { AuthGcal } from '../features/appointments/AuthGcal';

const Settings: React.FC = () => {
  const userInfo = useSelector(selectCurrentUser);

  const [updateUser] = useUpdateUserMutation();

  const [firstName, setFirstName] = useState(userInfo?.first_name || '');
  const [lastName, setLastName] = useState(userInfo?.last_name || '');
  const [pomoTimer, setPomoTimer] = useState(userInfo.pomodoro.toString());
  const [shortBreak, setShortBreak] = useState(userInfo.short_break.toString());
  const [longBreak, setLongBreak] = useState(userInfo.long_break.toString());

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const username =
    userInfo.first_name || userInfo.last_name
      ? `${userInfo.first_name} ${userInfo.last_name}`.trim()
      : userInfo.email;

  const navigate = useNavigate();
  const routeHome = () => {
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSave = async () => {
    // Client side validation
    if (!validateName(firstName)) {
      displayValidationError('Invalid First Name');
    } else if (!validateName(lastName)) {
      displayValidationError('Invalid Last Name');
    } else if (!validateTimer(pomoTimer)) {
      displayValidationError('Invalid Pomodoro');
    } else if (!validateTimer(shortBreak)) {
      displayValidationError('Invalid Short Break');
    } else if (!validateTimer(longBreak)) {
      displayValidationError('Invalid Long Break');
    } else {
      const updatePayload: UserPayload = {
        first_name: firstName,
        last_name: lastName,
        pomodoro: parseInt(pomoTimer),
        short_break: parseInt(shortBreak),
        long_break: parseInt(longBreak),
      };

      // Password validation
      // First check if any of the fields have values
      if (
        currentPassword.length !== 0 ||
        newPassword.length !== 0 ||
        confirmPassword.length !== 0
      ) {
        if (currentPassword.length === 0) {
          displayValidationError(
            'Current Password is required to change your password',
          );
        } else if (newPassword.length === 0) {
          displayValidationError(
            'New Password is required to change your password',
          );
        } else if (!validatePassword(newPassword)) {
          displayValidationError(
            'New Password must have at least one lowercase and uppercase letter, one digit, one special char, and minimum 8 chars',
          );
        } else if (newPassword !== confirmPassword) {
          displayValidationError(
            'New Password and Confirm Password do not match',
          );
        } else {
          // Password conditions are met, add to request body
          updatePayload.current_password = currentPassword;
          updatePayload.new_password = newPassword;
          console.log(updatePayload);

          // Update user with password
          await updateUser(updatePayload);
        }
      } else {
        // No password change
        await updateUser(updatePayload);
      }
    }
  };

  const content = (
    <div className="w-5/6">
      <div className="bg-gray-100 h-screen">
        <div className="flex ml-auto p-4 bg-white">
          <div className="w-1/2 text-left text-2xl font-bold">Profile</div>
          <div className="w-1/2 flex justify-end">
            <button
              id="nameID"
              data-testid="name"
              className="flex p-2 text-black border border-back hover:bg-gray-100 font-semibold rounded-md"
            >
              {username}
            </button>
          </div>
        </div>
        <h2 className="text-xl font-semibold pt-6 pl-8">User Information</h2>
        <div className="flex px-8 py-4">
          <div className="w-1/2 bg-white p-4 rounded-md">
            <label
              htmlFor="firstName"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="w-full p-2 border rounded-md shadow"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="w-1/2 bg-white p-4 rounded-md">
            <label
              htmlFor="lastName"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="w-full p-2 border rounded-md shadow"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold pt-6 pl-8">Change Password</h2>
        <div className="flex px-8 py-4">
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="oldpass"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="oldpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </span>
            </div>
          </div>
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="newpass"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="newpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </span>
            </div>
          </div>
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="confirmnewpass"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmnewpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute bottom-0 right-10 transform -translate-y-1/3 cursor-pointer -mr-8"
              >
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </span>
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold pt-6 pl-8">
          Pomodoro Timer (Minutes)
        </h2>
        <div className="flex px-8 py-4">
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="pomodoro"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Pomodoro
            </label>
            <input
              type="number"
              min="1"
              step="any"
              id="pomodoro"
              className="w-full p-2 border rounded-md shadow"
              value={pomoTimer}
              onChange={(e) => setPomoTimer(e.target.value)}
            />
          </div>
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="shortbreak"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Short Break
            </label>
            <input
              type="number"
              min="1"
              step="any"
              id="shortbreak"
              className="w-full p-2 border rounded-md shadow"
              value={shortBreak}
              onChange={(e) => setShortBreak(e.target.value)}
            />
          </div>
          <div className="w-1/3 bg-white p-4 rounded-md">
            <label
              htmlFor="longbreak"
              className="text-gray-600 flex"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                strokeWidth="2"
                stroke="#6284FF"
                className="w-6 h-6 pt-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Long Break
            </label>
            <input
              type="number"
              min="1"
              step="any"
              id="longbreak"
              className="w-full p-2 border rounded-md shadow"
              value={longBreak}
              onChange={(e) => setLongBreak(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center pb-10">
          <div className="flex space-x-6 pt-2">
            <button
              onClick={routeHome}
              className="btn-secondary w-40 py-2 px-4 rounded-md"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn-primary shadow-md w-40 text-white py-2 px-4 rounded-md"
              type="button"
            >
              Save
            </button>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <AuthGcal />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <div className="w-1/6">
        <SideBar />
      </div>
      {content}
    </div>
  );
};

export default Settings;
