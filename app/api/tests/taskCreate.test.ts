import { createTaskHandler } from '../src/controllers/taskController';
import * as taskService from '../src/services/taskService';
import * as taskValidation from '../src/validations/taskValidation';
import { AuthRequestInterface as AuthRequest } from '../src/interfaces/authInterface';
import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import Joi from 'joi';

jest.mock('../src/services/taskService');
jest.mock('../src/validations/taskValidation');

describe('createTaskHandler', () => {
  const mockRequest = {
    body: {
      // Your test data for the request body
      // Make sure it adheres to the expected structure
      name: 'Test Task',
      notes: 'Some notes',
      priority: 'Top Priority',
      timers: 2,
    },
    user_id: 'someUserId', // Your user ID for testing
  } as unknown as AuthRequest;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  const mockNext = jest.fn(); // Mock implementation for the 'next' function

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a task successfully', async () => {
    const mockValidationResult = {
      error: undefined,
      warning: undefined,
      value: 'someValue',
    };

    const mockCreateTask = jest
      .spyOn(taskService, 'createTask')
      .mockResolvedValue({
        _id: 'someId', // Replace with a valid ObjectId for testing
        user_id: 'someUserId', // Replace with a valid ObjectId for testing
        name: 'Test Task',
        status: 'someStatus',
        timers: 0,
        notes: 'someNotes',
        priority: 'somePriority',
        date: new Date(),
      } as any); // Replace 'any' with your actual TaskInterface type

    jest
      .spyOn(taskValidation, 'createTaskValidation')
      .mockReturnValue(mockValidationResult);

    await createTaskHandler(mockRequest, mockResponse, mockNext);

    expect(mockValidationResult.error).toBeUndefined();
    expect(mockCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: mockRequest.user_id }),
    );
    expect(mockResponse.status).toHaveBeenCalledWith(200);

    expect(mockNext).toHaveBeenCalled();
  });


  it('should handle task creation failure and throw an error', async () => {
    const mockValidationResult = {
      error: undefined,
      warning: undefined,
      value: 'someValue',
    };

    const mockCreateTask = jest
      .spyOn(taskService, 'createTask')
      .mockResolvedValue(null);

    jest
      .spyOn(taskValidation, 'createTaskValidation')
      .mockReturnValue(mockValidationResult);

    await createTaskHandler(mockRequest, mockResponse, mockNext);

    expect(mockValidationResult.error).toBeUndefined();
    expect(mockCreateTask).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: mockRequest.user_id })
    );

    // Ensure that the 'next' function was called
    expect(mockNext).toHaveBeenCalled();
  });

});
