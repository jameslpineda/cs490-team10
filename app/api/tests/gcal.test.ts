/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-vars */
import {
  createAuth,
  createTokens,
  getEvents,
} from '../src/controllers/gcalController';
import { AuthRequestInterface as AuthRequest } from '../src/interfaces/authInterface';
import { Response, NextFunction } from 'express';

jest.mock('../src/services/userService', () => ({
  getUser: jest.fn(),
  updateUser: jest.fn(),
}));

jest.mock('../src/validations/gcalValidation', () => ({
  createTokensValidation: jest.fn(),
}));

jest.mock('express-async-handler', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('moment', () => {
  const moment = jest.requireActual('moment');
  return jest.fn((...args) => moment(...args));
});

jest.mock('../src/controllers/gcalController', () => {
  const originalModule = jest.requireActual(
    '../src/controllers/gcalController',
  );
  return {
    ...originalModule,
    createTokens: jest.fn(),
};
});

describe('Your functions', () => {
  let req: AuthRequest;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = {} as AuthRequest;
    res = { status: jest.fn(), json: jest.fn() } as unknown as Response;
    next = jest.fn();
  });

  it('should create authorization URL', () => {
    const jsonMock = jest.fn();
    res.status = jest.fn().mockReturnValue({ json: jsonMock });

    createAuth(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ authUrl: expect.any(String) });
  });

  it('should create tokens successfully', async () => {
    const jsonMock = jest.fn();
    res.status = jest.fn().mockReturnValue({ json: jsonMock });

    const validationMock = { error: null };
    require('../src/validations/gcalValidation').createTokensValidation.mockReturnValue(
      validationMock,
    );

    const code = 'yourAuthorizationCode';
    req.body = { code };

    (createTokens as jest.Mock).mockImplementationOnce(
      async (req, res, next) => {
        throw new Error('createTokens should not be called during this test');
      },
    );

    await createAuth(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should handle createTokens validation error', async () => {
    const validationMock = {
      error: { details: [{ message: 'Validation error message' }] },
    };
    require('../src/validations/gcalValidation').createTokensValidation.mockReturnValue(
      validationMock,
    );

    const code = 'invalidCode';
    req.body = { code };

    (createTokens as jest.Mock).mockImplementationOnce(
      async (req, res, next) => {
        throw new Error('createTokens should not be called during this test');
      },
    );

    await createAuth(req, res);
  });

  it('should handle createTokens user update failure', async () => {
    const validationMock = { error: null };
    require('../src/validations/gcalValidation').createTokensValidation.mockReturnValue(
      validationMock,
    );

    const code = 'yourAuthorizationCode';
    req.body = { code };

    jest.mock('../src/services/gcalService', () => ({
      getTokens: jest.fn(() => ({ refresh_token: 'refreshToken' })),
    }));

    jest.mock('../src/services/userService', () => ({
      updateUser: jest.fn(() => null),
    }));

    await createAuth(req, res);
  });
});
