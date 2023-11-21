import { coreConfig } from '../utils/config';
import { getBearerToken } from './userServices';

export function getPomo() {
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
      return data.pomodoro;
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
    });
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
