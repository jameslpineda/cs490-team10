import { apiSlice } from '../../app/api/apiSlice';
import { signOut } from './authSlice';

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
        } catch (err) {
          console.log(err);
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
