import { apiSlice } from '../../app/api/apiSlice';
import { signOut } from './authSlice';
import { toast } from 'react-toastify';

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
    refreshToken: builder.mutation({
      query: () => ({
        url: '/user/refresh-token',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSendSignOutMutation,
  useRefreshTokenMutation,
} = authApiSlice;
