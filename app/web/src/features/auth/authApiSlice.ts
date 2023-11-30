import { apiSlice } from '../../app/api/apiSlice';
import { setCredentials, signOut } from './authSlice';
import { toast } from 'react-toastify';

type RefreshTokenResponse = {
  accessToken: string;
  user: {
    email: string;
    first_name: string;
    last_name: string;
    pomodoro: number;
    short_break: number;
    long_break: number;
  };
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/user/sign-in',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    sendSignOut: builder.mutation<void, void>({
      query: () => ({
        url: '/user/sign-out',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(signOut());
          dispatch(apiSlice.util.resetApiState());

          toast.success('Successfully signed out!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 5000,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err?.error?.data?.message) {
            toast.error(err?.error?.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 7000,
            });
          } else {
            toast.error('An unexpected error has occurred', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 7000,
            });
          }
        }
      },
    }),
    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);

          const { accessToken, user } = data;
          dispatch(setCredentials({ accessToken, user }));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          toast.error('You must be signed in to access this page', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 7000,
          });
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSendSignOutMutation,
  useRefreshTokenMutation,
} = authApiSlice;
