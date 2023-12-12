import { Navigate, Outlet } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useRefreshTokenMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import Spinner from '../../components/Spinner';
// import { toast } from 'react-toastify';

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { status, isLoading, isSuccess, isError }] =
    useRefreshTokenMutation();

  useEffect(() => {
    // Make sure to add check for prod
    if (effectRan.current === true || process.env.NODE_ENV === 'production') {
      const verifyRefreshToken = async () => {
        // console.log('verifying refresh token');
        try {
          // const response =
          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.log(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    effectRan.current = true;
  }, []);

  let content = <Spinner />;

  // persist: no
  if (!persist) {
    content = <Outlet />;

    // persist: yes, token: no
  } else if (isLoading) {
    content = <Spinner />;
    // persist: yes, token: no (refresh token missing)
  } else if (isError) {
    // toast.error('You must sign in to access this page');
    content = (
      <Navigate
        to="/"
        replace
      />
    );
    // persist: yes, token: yes
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && status === 'uninitialized') {
    // console.log('is uninit');
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
