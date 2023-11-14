import axios from 'axios';
import { coreConfig } from '../../utils/config';

// Register user
const register = async (userData) => {
  const response = await axios.post(
    `${coreConfig.apiBaseUrl}/user/sign-up`,
    userData,
  );
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(
    `${coreConfig.apiBaseUrl}/user/sign-in`,
    userData,
  );
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
