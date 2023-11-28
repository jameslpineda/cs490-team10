import {
  retrieveTasksHandler,
  updateTaskHandler,
} from '../src/controllers/taskController';
import * as taskService from '../src/services/taskService';
import * as taskValidation from '../src/validations/taskValidation';
import { AuthRequestInterface as AuthRequest } from '../src/interfaces/authInterface';
import { Response } from 'express';

jest.mock('../src/services/taskService');
jest.mock('../src/validations/taskValidation');

describe('Task Handlers', () => {
  const mockRequest = {} as AuthRequest;
  const mockResponse = {} as Response;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('retrieveTasksHandler', () => {
    it('should handle error when retrieving tasks', async () => {
      const errorMessage = 'Error retrieving tasks';
      jest
        .spyOn(taskService, 'getTasksByDate')
        .mockRejectedValue(new Error(errorMessage));

      await retrieveTasksHandler(mockRequest, mockResponse, jest.fn());
    });
  });

  it('should handle error when updating a task', async () => {
    const errorMessage = 'Error updating task';
    const mockValidationResult = {
      error: undefined,
      warning: undefined,
      value: 'someValue',
    };

    jest
      .spyOn(taskService, 'updateTask')
      .mockRejectedValue(new Error(errorMessage));

    jest
      .spyOn(taskValidation, 'updateTaskValidation')
      .mockReturnValue(mockValidationResult);

    await updateTaskHandler(mockRequest, mockResponse, jest.fn());
  });
});
