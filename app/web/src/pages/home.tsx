/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const routeSettings = () => {
    navigate('../settings');
  };

  const routeLogout = () => {
    navigate('../signIn');
  };
  return (
    <div className="flex">
      <div className="flex flex-col h-screen w-1/6 bg-gray-900">
        <div className="h-5/6">
          <h2 className="text-2xl text-white pt-10 font-semibold text-center">
            Crush It
          </h2>
          <div className="flex justify-center py-4">
            <hr className="border-gray-600 w-2/3"></hr>
          </div>
          <div className="flex justify-center pt-8 pb-4">
            <img
              className="w-13 h-13"
              src={process.env.PUBLIC_URL + '/image1.png'}
              alt="Crush It Image"
            />
          </div>
          <div className="flex justify-center">
            <p className="w-1/2 text-lg text-white font-semibold text-center">
              It's time to plan your day!
            </p>
          </div>
          <div className="flex justify-center items-center pb-20 mb-5">
            <div className="flex space-x-6 pt-4">
              <button
                className="shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-gray-800 font-semibold py-2 px-8 rounded-md"
                type="button"
              >
                Plan Day
              </button>
            </div>
          </div>
        </div>
        <div className="h-1/6 flex-grow flex justify-center items-center">
          <button
            onClick={routeLogout}
            className="flex shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-red-500 text-sm py-1 px-4 rounded-md"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
      <div className="w-5/6 bg-gray-100 h-screen">
        <div className="bg-white flex p-4">
          <div className="flex-grow"></div>
          <button
            onClick={routeSettings}
            data-testid="name"
            className="flex p-2 text-black border border-black hover:bg-gray-100 font-semibold rounded-md"
          >
            John Doe
          </button>
        </div>
        <div className="bg-gray-100">
          <div className="p-4 m-4 bg-indigo-100 rounded-2xl">
            <button className="border border-black">Test</button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold">Task</h2>
            <div className="flex-1 flex-col flex-grow">
              <div className="flex-grow bg-white rounded-lg shadow-md">
                <div className="flex flex-col p-4">
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">Top Priority</h2>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">Important</h2>
                  </div>
                  <div className="flex-1 bg-gray-100 rounded-md p-4 mb-4">
                    <h2 className="text-xl font-semibold font-sans">Other</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-semibold">Appointment</h2>
            <div className="flex flex-col flex-grow">TODO Next Sprint</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
