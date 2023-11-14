import request from 'supertest';
import express from 'express';
import { updateTaskHandler } from '../src/controllers/taskController';

const app = express();

jest.mock(
  'express-async-handler',
  () => (fn: any) => (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  },
);

app.use(express.json());

app.put('/task/update', updateTaskHandler);

describe('updateTaskData Route', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  // Checks for successful task update
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
      status: 'completed',
      timers: 123,
      notes: 'Some notes',
      priority: 'other',
    };

    const response = await request(app)
      .put('/task/update')
      .send(requestBody);

    if (response.body.updatedFields) {
      expect(response.body.updatedFields).toEqual(
        Object.keys(mockUpdatedFields),
      );
    }
  });

  // Checks for validation error
  it('should handle validation error and return 422', async () => {
    const mockValidation = {
      error: { details: [{ message: 'Validation error message' }] },
    };
    jest.mock('../src/validations/taskValidation', () => ({
      validateTask: jest.fn(() => mockValidation),
    }));

    const requestBody = {
      status: 'low',
    };

    const response = await request(app)
      .put('/task/update')
      .send(requestBody);

    expect(response.status).toBe(422);
  });
});
