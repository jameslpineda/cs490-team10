import axios from 'axios';
import { coreConfig } from '../../utils/config';
import { UserData } from '../../interfaces/userInterface';

// Login user
const login = async (userData: UserData) => {
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
const logout = async () => {
  const response = await axios.post(`${coreConfig.apiBaseUrl}/user/sign-out`);
  if (response.data) {
    localStorage.removeItem('user');
  }
  return response.data;
};

const authService = {
  login,
  logout,
};

export default authService;
