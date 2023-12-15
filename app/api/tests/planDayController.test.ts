import { Response, NextFunction } from 'express';
import { planTaskHandler } from '../src/controllers/taskController';

describe('planTaskHandler', () => {
  it('plans a day with no tasks', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = { user_id: 'mockUserId', query: { date: '2023-01-01' } };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext: NextFunction = jest.fn();

    await planTaskHandler(req, res as Response, mockNext);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Tasks updated successfully',
    });
  });
  it('should handle planning tasks successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = { user_id: 'mockUserId', query: { date: '2023-01-01' } };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const mockNext: NextFunction = jest.fn();

    await planTaskHandler(req, res, mockNext);
    expect(res.status).toHaveBeenCalledWith(200);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle errors during planning tasks', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const req: any = { user_id: 'mockUserId', query: { date: '2023-01-01' } };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.mock('../src/services/taskService', () => ({
      getTasksByDate: jest.fn().mockRejectedValue(new Error('Database error')),
    }));

    const mockNext: NextFunction = jest.fn();

    await planTaskHandler(req, res as Response, mockNext);
  });
});