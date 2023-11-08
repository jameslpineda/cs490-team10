import { Request, Response, NextFunction } from 'express';
import { logEvents } from './logger';

// Disable eslint to allow error handler overwrite
/* eslint-disable */ //
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  /* eslint-enable */ //
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log',
  );

  const statusCode = res.statusCode ? res.statusCode : 500; // Server error

  res.status(statusCode);

  res.json({ message: err.message, stack: err.stack });
};

export { errorHandler };
