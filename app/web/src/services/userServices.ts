import { coreConfig } from '../utils/config';

export function getUserID() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    return userObject._id;
  }
}
export function getBearerToken() {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const userObject = JSON.parse(storedUser);
    return userObject.token;
  }
}

export async function getPomo(): Promise<number> {
  try {
    const tok = getBearerToken();
    const response = await fetch(`${coreConfig.apiBaseUrl}/user/info`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tok}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.pomodoro;
  } catch (error) {
    console.error('Error fetching user:', error);
    // You can choose to return a default value or handle the error as needed
    throw error;
  }
}

export function getShortBreak() {
  const tok = getBearerToken();
  fetch(`${coreConfig.apiBaseUrl}/user/info`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tok}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.short_break;
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
}

export function getLongBreak() {
  const tok = getBearerToken();
  fetch(`${coreConfig.apiBaseUrl}/user/info`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tok}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.long_break;
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
}
