import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  setCredentials,
  signOut,
} from '../../features/auth/authSlice';
import { apiSlice } from '../../app/api/apiSlice';

const initialState = {
  auth: {
    user: {
      pomodoro: 25,
      username: 'TestUserName',
      short_break: 5,
      long_break: 10,
    },
    token: 'yourAccessToken',
  },
};

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  preloadedState: initialState,
});

export const mockRefreshToken = async () => {
  const refreshResult = { data: { newToken: 'newAccessToken' } };
  mockStore.dispatch(setCredentials(refreshResult.data));
  return refreshResult;
};

export const mockSignOut = async () => {
  mockStore.dispatch(signOut());
};

export default mockStore;
