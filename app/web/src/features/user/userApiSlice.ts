import { apiSlice } from '../../app/api/apiSlice';
import { setUser } from '../auth/authSlice';
import { toast } from 'react-toastify';

export type UserPayload = {
  email?: string;
  first_name?: string;
  last_name?: string;
  pomodoro?: number;
  short_break?: number;
  long_break?: number;
  current_password?: string;
  new_password?: string;
};

type UpdateResponse = {
  message: string;
  user: UserPayload;
  updatedValues: string[];
};

type SignUpPayload = {
  email: string;
  password: string;
};
type SignUpResponse = {
  email: string;
  message: string;
};
type VerifyPayload = {
  token: string;
};
type VerifyResponse = {
  email: string;
  message: string;
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<UserPayload, void>({
      query: () => '/user/info',
    }),
    createUser: builder.mutation<SignUpResponse, SignUpPayload>({
      query: (payload) => ({
        url: '/user/sign-up',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;

          toast.success(
            'Verification Email Sent! Please verify your account before signing in.',
            {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 7000,
            },
          );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err);
          if (err?.error?.data?.message) {
            toast.error(err?.error?.data?.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          } else {
            toast.error('An unexpected error has occurred', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          }
        }
      },
    }),
    updateUser: builder.mutation<UpdateResponse, UserPayload>({
      query: (payload) => ({
        url: '/user/update',
        method: 'POST',
        body: payload,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log('DATA: ', data);
          dispatch(setUser(data.user));

          toast.success(`${data.message}!`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err?.error?.data?.message) {
            toast.error(err?.error?.data?.message, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          } else {
            toast.error('An unexpected error has occurred', {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 7000,
            });
          }
        }
      },
    }),
    verifyUser: builder.mutation<VerifyResponse, VerifyPayload>({
      query: ({ token }) => ({
        url: `/user/verify?token=${token}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useGetInfoQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useVerifyUserMutation,
} = userApiSlice;
