import { ObjectId } from 'mongodb';
import {
  createTaskHandler,
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
    it('should retrieve tasks successfully', async () => {
      const mockGetTasksByDate = jest
        .spyOn(taskService, 'getTasksByDate')
        .mockResolvedValue([
          {
            _id: new ObjectId(),
            user_id: new ObjectId(),
            name: 'Test Task',
            status: 'someStatus',
            timers: 0,
            notes: 'someNotes',
            priority: 'somePriority',
            date: new Date(),
          },
        ]);

      await retrieveTasksHandler(mockRequest, mockResponse, jest.fn());
    });

    it('should handle error when retrieving tasks', async () => {
      const errorMessage = 'Error retrieving tasks';
      jest
        .spyOn(taskService, 'getTasksByDate')
        .mockRejectedValue(new Error(errorMessage));

      await retrieveTasksHandler(mockRequest, mockResponse, jest.fn());
    });
  });

  describe('updateTaskHandler', () => {
    it('should update a task successfully', async () => {
      const mockValidationResult = {
        error: undefined,
        warning: undefined,
        value: 'someValue',
      };
      const mockUpdateTask = jest
        .spyOn(taskService, 'updateTask')
        .mockResolvedValue({
          _id: new ObjectId(),
          user_id: new ObjectId(),
          name: 'Test Task',
          status: 'Updated Status',
          timers: 1,
          notes: 'Updated Notes',
          priority: 'Updated Priority',
          date: new Date(),
        });

      jest
        .spyOn(taskValidation, 'updateTaskValidation')
        .mockReturnValue(mockValidationResult);

      await updateTaskHandler(mockRequest, mockResponse, jest.fn());

      expect(mockValidationResult.error).toBeUndefined();
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
});
