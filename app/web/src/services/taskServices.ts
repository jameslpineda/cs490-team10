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

export async function getTasksByDateService(
  date: string,
): Promise<TaskProps[]> {
  try {
    const response = await fetch(
      `${coreConfig.apiBaseUrl}/task/retrieve?date=${date}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getBearerToken()}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: TaskProps[] = await response.json();
    console.log('Tasks retrieved:', data);

    return data;
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    throw error;
  }
}

export async function updateTask(task: TaskProps) {
  const taskId = task._id;
  const url = `${coreConfig.apiBaseUrl}/task/update/${taskId}`;

  fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${getBearerToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: task.name,
      notes: task.notes,
      timers: task.timers,
      priority: task.priority,
      status: task.status,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
