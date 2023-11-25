import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, signOut } from '../../features/auth/authSlice';
import { RootState } from '../../interfaces/stateInterface';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:443',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result?.error &&
    'originalStatus' in result.error &&
    result.error.originalStatus === 403
  ) {
    console.log('Sending refresh token');
    // Send refresh token to get new access token
    const refreshResult = await baseQuery(
      '/user/refresh-token',
      api,
      extraOptions,
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;

      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));

      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(signOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
});
