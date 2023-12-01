import { Response, NextFunction } from 'express';
import {
  createTaskHandler,
  retrieveTasksHandler,
  updateTaskHandler,
} from '../src/controllers/taskController'; // Update the import path
import { AuthRequestInterface as AuthRequest } from '../src/interfaces/authInterface';

jest.mock('../src/services/taskService', () => ({
  createTask: jest.fn(),
  getTasksByDate: jest.fn(),
  updateTask: jest.fn(),
}));

jest.mock('../src/validations/taskValidation', () => ({
  createTaskValidation: jest.fn(),
  updateTaskValidation: jest.fn(),
}));

describe('Task Controller', () => {
  let mockRequest: AuthRequest;
  let mockResponse: Response;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      user_id: 'mockUserId',
      params: { id: 'mockTaskId' },
      body: {}, // Provide a valid request body as needed
    } as unknown as AuthRequest;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    mockNext = jest.fn;
  });

  describe('createTaskHandler', () => {
    it('should create a task successfully', async () => {
      const mockValidationResult = { error: null }; // Adjust based on your validation logic
      jest
        .requireMock('../src/validations/taskValidation')
        .createTaskValidation.mockReturnValue(mockValidationResult);

      const mockCreatedTask = { name: 'Test Task' }; // Adjust based on your expected task structure
      jest
        .requireMock('../src/services/taskService')
        .createTask.mockResolvedValue(mockCreatedTask);

      await createTaskHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Task created: Test Task',
      });
    });

    it('should handle validation error', async () => {
      const mockValidationError = { error: new Error('Validation error') }; // Adjust based on your expected validation error
      jest
        .requireMock('../src/validations/taskValidation')
        .createTaskValidation.mockReturnValue(mockValidationError);

      await createTaskHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
    });

    it('should handle create task failure', async () => {
      const mockValidationResult = { error: null };
      jest
        .requireMock('../src/validations/taskValidation')
        .createTaskValidation.mockReturnValue(mockValidationResult);

      jest
        .requireMock('../src/services/taskService')
        .createTask.mockResolvedValue(null);

      await createTaskHandler(mockRequest, mockResponse, mockNext);
    });
  });

  describe('retrieveTasksHandler', () => {
    it('should retrieve tasks successfully', async () => {
      const mockTasks = [
        {
          _id: 'mockTaskId',
          name: 'Test Task',
          status: 'someStatus',
          timers: 0,
          completed_timers: 0,
          notes: 'someNotes',
          priority: 'somePriority',
          date: new Date(),
        },
      ];

      jest
        .requireMock('../src/services/taskService')
        .getTasksByDate.mockResolvedValue(mockTasks);

      await retrieveTasksHandler(mockRequest, mockResponse, mockNext);
    });

    it('should handle missing date in query', async () => {
      // Update the request to have a missing date
      mockRequest.query = {};

      await retrieveTasksHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
    });
  });

  describe('updateTaskHandler', () => {
    it('should update a task successfully', async () => {
      const mockValidationResult = { error: null }; // Adjust based on your validation logic
      jest
        .requireMock('../src/validations/taskValidation')
        .updateTaskValidation.mockReturnValue(mockValidationResult);

      const mockUpdatedTask = {
        _id: 'mockTaskId',
        name: 'Updated Task',
        status: 'Updated Status',
        timers: 1,
        completed_timers: 1,
        notes: 'Updated Notes',
        priority: 'Updated Priority',
        date: new Date(),
      };

      jest
        .requireMock('../src/services/taskService')
        .updateTask.mockResolvedValue(mockUpdatedTask);

      await updateTaskHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle validation error', async () => {
      const mockValidationError = { error: new Error('Validation error') }; // Adjust based on your expected validation error
      jest
        .requireMock('../src/validations/taskValidation')
        .updateTaskValidation.mockReturnValue(mockValidationError);

      await updateTaskHandler(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(422);
    });

    it('should handle update task failure', async () => {
      const mockValidationResult = { error: null };
      jest
        .requireMock('../src/validations/taskValidation')
        .updateTaskValidation.mockReturnValue(mockValidationResult);

      jest
        .requireMock('../src/services/taskService')
        .updateTask.mockResolvedValue(null);

      await updateTaskHandler(mockRequest, mockResponse, mockNext);
    });
  });
});
