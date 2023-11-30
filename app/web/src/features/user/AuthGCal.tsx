import React, { useEffect } from 'react';
import { useLazyCreateAuthQuery } from './userApiSlice';
import { toast } from 'react-toastify';

export const AuthGCal = () => {
  const [createAuth, { data }] = useLazyCreateAuthQuery();

  // Initialize
  useEffect(() => {
    createAuth();
  }, []);

  const handleClick = () => {
    createAuth();
    if (data) {
      console.log(data.authUrl);

      // Redirect user
      window.location.href = data.authUrl;
    } else {
      toast.error('Something went wrong!');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="shadow-md shadow-blue-200 w-40 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
      type="button"
    >
      Authorize Google
    </button>
  );
};
