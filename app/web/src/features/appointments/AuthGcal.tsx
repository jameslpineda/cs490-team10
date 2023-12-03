import React, { useEffect, useRef } from 'react';
import {
  useLazyCreateAuthQuery,
  useCreateTokensMutation,
} from '../appointments/appointmentsApiSlice';
import { toast } from 'react-toastify';
import queryString from 'query-string';

export const AuthGcal = () => {
  const [createAuthUrl, { data }] = useLazyCreateAuthQuery();
  const [createTokens] = useCreateTokensMutation();
  const effectRan = useRef(false);

  const { code } = queryString.parse(window.location.search);

  // Initialize lazy query
  useEffect(() => {
    createAuthUrl();
  }, []);

  useEffect(() => {
    // Make sure to add check for prod
    // Ensures that effect runs once
    if (effectRan.current === true) {
      handleCode();
    }

    effectRan.current = true;
  }, []);

  const handleCode = async () => {
    if (code !== null && code !== undefined && typeof code === 'string') {
      try {
        await createTokens({ code }).unwrap();

        toast.success('Sucessfully authorized!', {
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
    try {
      createAuthUrl();

      if (data) {
        // Redirect user
        window.location.href = data.authUrl;
      } else {
        toast.error('Failed to create auth URL', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error('Something went wrong!', {
        position: toast.POSITION.TOP_CENTER,
      });
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
