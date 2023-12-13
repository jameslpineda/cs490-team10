import { Navigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import { useVerifyUserMutation } from './userApiSlice';
import Spinner from '../../components/Spinner';
// import { toast } from 'react-toastify';

const VerifyUser = () => {
  const effectRan = useRef(false);
  const { token } = useParams();

  const [verify, { isLoading }] = useVerifyUserMutation();

  useEffect(() => {
    // Make sure to add check for prod
    if (effectRan.current === true || process.env.NODE_ENV === 'production') {
      const verifyUser = async (vtoken: string) => {
        // console.log('verifying refresh token');
        try {
          // const response =
          await verify({ token: vtoken });
          // const { accessToken } = response.data
        } catch (err) {
          console.log(err);
        }
      };

      if (token !== undefined) verifyUser(token);
    }

    effectRan.current = true;
  }, []);

  let content = <Spinner />;

  if (!isLoading) {
    content = (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return content;
};

export default VerifyUser;
