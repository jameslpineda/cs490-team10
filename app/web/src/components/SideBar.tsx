import React, { useEffect } from 'react';
import crushItLogo from '../assets/images/crush_it_logo.png';
import { useNavigate, Link } from 'react-router-dom';

import { useSendSignOutMutation } from '../features/auth/authApiSlice';
import { toast } from 'react-toastify';

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  /* eslint-disable */
  const [sendSignOut, { isLoading, isSuccess, isError, error }] =
    useSendSignOutMutation();
  /* eslint-enable */

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }

    if (isError && error) {
      toast.error('An error occurred when signing out', { autoClose: 7000 });
      console.log(error);
    }
  }, [isSuccess, isError, error, navigate]);

  const onSignOutClick = () => sendSignOut();

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="h-5/6">
        <Link to="/home">
          <h2 className="text-2xl text-white pt-10 font-semibold font-fredoka-one text-center">
            Crush It
          </h2>
        </Link>
        <div className="flex justify-center py-4">
          <hr className="border-gray-600 w-2/3"></hr>
        </div>
        <div className="flex justify-center pt-8 pb-4">
          <img
            className="w-36 h-36"
            src={crushItLogo}
            alt="Crush It Image"
          />
        </div>
        <div className="flex justify-center">
          <p className="w-1/2 text-lg text-white font-semibold text-center">
            It&apos;s time to plan your day!
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
          className="flex shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-red-500 text-sm py-1 px-4 rounded-md"
          type="button"
          onClick={onSignOutClick}
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
  );
};

export default SideBar;
