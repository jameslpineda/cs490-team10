import { apiSlice } from '../../app/api/apiSlice';
// import { setUser } from '../auth/authSlice';
// import { toast } from 'react-toastify';

type CreateAuthResponse = {
  authUrl: string;
};
type CreateTokensPayload = {
  code: string;
};
type CreateTokensResponse = {
  message: string;
};
// type GetEventsPayload = {
//   date: string;
// };
// type GetEventsResponse = {
//   message: string;
//   events: unknown;
// };

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAuth: builder.query<CreateAuthResponse, void>({
      query: () => '/gcal/create-auth',
    }),
    createTokens: builder.mutation<CreateTokensResponse, CreateTokensPayload>({
      query: (payload) => ({
        url: '/gcal/create-tokens',
        method: 'POST',
        body: payload,
      }),
    }),
    getEvents: builder.query({
      query: (date) => ({
        url: `/gcal/get-events?date=${date}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLazyCreateAuthQuery,
  useCreateTokensMutation,
  useGetEventsQuery,
} = appointmentsApiSlice;
