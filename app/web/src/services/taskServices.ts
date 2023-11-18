import { TaskProps } from '../interfaces/taskInterface';
import { coreConfig } from '../utils/config';
import { getBearerToken } from './userServices';

export async function postTaskService(task: TaskProps) {
  fetch(`${coreConfig.apiBaseUrl}/task/create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Task created successfully:', data);
    })
    .catch((error) => {
      console.error('Error creating task:', error.message);
    });
}
