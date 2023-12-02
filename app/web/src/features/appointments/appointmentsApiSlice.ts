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
  tokens: unknown;
};

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
  }),
});

export const { useLazyCreateAuthQuery, useCreateTokensMutation } =
  appointmentsApiSlice;
