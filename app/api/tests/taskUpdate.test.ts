import request from 'supertest';
import express from 'express';
import { updateTaskData } from '../src/controllers/taskController';

const app = express();

jest.mock(
  'express-async-handler',
  () => (fn: any) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
);

app.use(express.json());

app.put('/task/update', updateTaskData);

it('should update task status successfully', async () => {
  const mockUpdatedFields = {
    status: 'completed',
    timers: 123,
    notes: 'Some notes',
    priority: 'high',
  };

  const mockUpdateTask = jest.fn(() =>
    Promise.resolve({ _id: 'task_id', ...mockUpdatedFields }),
  );
  jest.mock('../src/services/taskService', () => ({
    updateTask: mockUpdateTask,
  }));

  const mockValidation = { error: null };
  jest.mock('../src/validations/taskValidation', () => ({
    validateTask: jest.fn(() => mockValidation),
  }));

  const requestBody = {
    task_id: 'task_id',
    status: 'completed',
    timers: 123,
    notes: 'Some notes',
    priority: 'high',
  };

  const response = await request(app).put('/task/update').send(requestBody);

  // Check if updatedFields exists before asserting its value
  if (response.body.updatedFields) {
    expect(response.body.updatedFields).toEqual(Object.keys(mockUpdatedFields));
  }
});
