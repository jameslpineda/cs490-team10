import React, { useEffect, useRef } from 'react';
import {
  useLazyCreateAuthQuery,
  useCreateTokensMutation,
} from '../appointments/appointmentsApiSlice';
import { toast } from 'react-toastify';
import queryString from 'query-string';

export const AuthGcal = () => {
  const [createAuth, { data }] = useLazyCreateAuthQuery();
  const [createTokens] = useCreateTokensMutation();
  const effectRan = useRef(false);

  const { code } = queryString.parse(window.location.search);

  // Initialize
  useEffect(() => {
    createAuth();
  }, []);

  useEffect(() => {
    // Make sure to add check for prod
    // Ensures that effect runs once
    if (effectRan.current === true) {
      // console.log('code:', code);
      handleCode();
    }

    effectRan.current = true;
  }, []);

  const handleCode = async () => {
    if (code !== null && code !== undefined && typeof code === 'string') {
      try {
        await createTokens({ code }).unwrap();

        toast.error('Sucessfully authorized!', {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (err) {
        toast.error(
          'An error occurred while processing the authorization code!',
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
      }
    }
  };

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
      className="flex w-80 bg-white text-gray-600 justify-center rounded-xl p-3"
    >
      <span className="mr-1">Connect to</span>
      <span className="text-primary">Google Calendar</span>?
    </button>
  );
};
