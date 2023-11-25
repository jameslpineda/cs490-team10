import { apiSlice } from '../../app/api/apiSlice';

type User = {
  email?: string;
  first_name?: string;
  last_name?: string;
  pomodoro?: number;
  short_break?: number;
  long_break?: number;
};

type UpdateResponse = {
  message: string;
  updatedUser: User;
  updateValues: string[];
};

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfo: builder.query<User, void>({
      query: () => '/user/info',
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation<UpdateResponse, User>({
      query: (payload) => ({
        url: '/user/update',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useGetInfoQuery, useUpdateUserMutation } = userApiSlice;
