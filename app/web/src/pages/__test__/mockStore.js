import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';

const initialState = {
  auth: {
    user: {
      pomodoro: 25, // or whatever default value you want
    },
    token: 'yourAccessToken',
  },
  // Add other slices of state as needed
};

// Create a mock store with a minimal configuration
const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers as needed
  },
  preloadedState: initialState,
});

export default mockStore;
