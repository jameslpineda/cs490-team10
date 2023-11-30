import { configureStore } from '@reduxjs/toolkit';
import authReducer, {
  setCredentials,
  signOut,
} from '../../features/auth/authSlice';
import { apiSlice } from '../../app/api/apiSlice'; // Adjust the import path

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
  // Add other slices of state as needed
};

// Create a mock store with a minimal configuration
const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // Include the RTK-Query reducer
    // Add other reducers as needed
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Include the RTK-Query middleware
  preloadedState: initialState,
});

// Define an async function to handle the token refresh logic in your tests
export const mockRefreshToken = async () => {
  // Simulate a successful token refresh
  const refreshResult = { data: { newToken: 'newAccessToken' } };

  // Dispatch the token update action
  mockStore.dispatch(setCredentials(refreshResult.data));

  // Return the refresh result
  return refreshResult;
};

// Define an async function to handle the sign-out logic in your tests
export const mockSignOut = async () => {
  // Simulate signing out by dispatching the sign-out action
  mockStore.dispatch(signOut());
};

export default mockStore;
