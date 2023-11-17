import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { coreConfig } from '../utils/config';
import SideBar from '../components/SideBar';

const Settings: React.FC = () => {
  // TODO: update usestate with session values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pomoTimer, setPomoTimer] = useState('25');
  const [shortBreak, setShortBreak] = useState('5');
  const [longBreak, setLongBreak] = useState('15');
  const [displayName, setDisplayName] = useState('');

  const navigate = useNavigate();
  const routeHome = () => {
    navigate('../home');
  };

  const dispatch = useAppDispatch();
  const routeLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userObject = JSON.parse(storedUser);
      const token = userObject.token;

      fetch(`${coreConfig.apiBaseUrl}/user/info`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setPomoTimer(data.pomodoro);
          setShortBreak(data.short_break);
          setLongBreak(data.long_break);
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
        });
    }
  }, [displayName]);

  const validatePassword = async () => {
    const password = document.getElementById('oldpass') as HTMLInputElement;
    const newPassword = document.getElementById('newpass') as HTMLInputElement;
    const confirmNewPassword = document.getElementById(
      'confirmnewpass',
    ) as HTMLInputElement;
    const r =
      /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/;

    // TODO: Update first name, last name, and timer settings
    if (password.value === '') {
      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        const userObject = JSON.parse(storedUser);
        const token = userObject.token;

        try {
          const response = await fetch(`${coreConfig.apiBaseUrl}/user/update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              first_name: firstName,
              last_name: lastName,
              pomodoro: pomoTimer,
              short_break: shortBreak,
              long_break: longBreak,
            }),
          });
          if (!response.ok) {
            toast.error('Server Error', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            toast.success('Settings Updated', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 5000,
            });
          }
        } catch (error) {
          console.error('Error updating user settings:', error);
          toast.error('Unable to find User', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
      }
    } else {
      if (r.test(newPassword.value)) {
        if (newPassword.value === confirmNewPassword.value) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userObject = JSON.parse(storedUser);
            const token = userObject.token;
            try {
              const response = await fetch(
                `${coreConfig.apiBaseUrl}/user/update`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    new_password: newPassword.value,
                    current_password: password.value,
                    pomodoro: pomoTimer,
                    short_break: shortBreak,
                    long_break: longBreak,
                  }),
                },
              );
              if (response.status == 200) {
                if (firstName == '' && lastName == '') {
                  setDisplayName(userObject.email);
                } else {
                  setDisplayName(firstName + ' ' + lastName);
                }
                toast.success('Settings and Password Updated', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                });
              } else if (response.status == 401) {
                toast.error('Current password is invalid', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                });
              } else if (response.status == 422) {
                toast.error("New password doesn't fit criteria", {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                });
              } else {
                toast.error(response.status + ' Error', {
                  position: toast.POSITION.TOP_CENTER,
                  autoClose: 5000,
                });
              }
            } catch (error) {
              console.error('Error updating user settings:', error);
              toast.error('Unable to find User', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
              });
            }
          }
        } else {
          toast.error("Password confirmation doesn't match", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
        }
      } else {
        toast.error("New password doesn't fit criteria", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 5000,
        });
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-1/6">
        <SideBar />
      </div>
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
                {displayName}
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
                onChange={(evt) => {
                  const alphaRegex = /^[a-zA-Z]*$/;
                  if (alphaRegex.test(evt.target.value)) {
                    setFirstName(evt.target.value);
                  }
                }}
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
                onChange={(evt) => {
                  const alphaRegex = /^[a-zA-Z]*$/;
                  if (alphaRegex.test(evt.target.value)) {
                    setLastName(evt.target.value);
                  }
                }}
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
              <input
                type="password"
                id="oldpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
              />
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
              <input
                type="password"
                id="newpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
              />
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
              <input
                type="password"
                id="confirmnewpass"
                className="w-full p-2 border rounded-md shadow"
                placeholder="********"
              />
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
                onChange={(evt) => {
                  const alphaRegex = /^[0-9]*$/;
                  if (alphaRegex.test(evt.target.value)) {
                    setPomoTimer(evt.target.value);
                  }
                }}
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
                onChange={(evt) => {
                  const alphaRegex = /^[0-9]*$/;
                  if (alphaRegex.test(evt.target.value)) {
                    setShortBreak(evt.target.value);
                  }
                }}
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
                onChange={(evt) => {
                  const alphaRegex = /^[0-9]*$/;
                  if (alphaRegex.test(evt.target.value)) {
                    setLongBreak(evt.target.value);
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-center items-center pb-10">
            <div className="flex space-x-6 pt-2">
              <button
                onClick={routeHome}
                className="shadow-md shadow-blue-200 w-40 border border-blue-500 bg-white hover:bg-gray-200 text-blue-500 py-2 px-4 rounded-md"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={validatePassword}
                className="shadow-md shadow-blue-200 w-40 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
