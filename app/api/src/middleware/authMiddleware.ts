import { Response, NextFunction } from 'express';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import asyncHandler from 'express-async-handler';
import { verifyJwtToken } from '../utils/auth';

const requireAuth = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Decode token
        const decodedToken = verifyJwtToken(token);
        if (!decodedToken) {
          res.status(403);
          throw new Error('Not authorized, invalid token');
        }

        // Get user_id from token
        req.user_id = decodedToken._id;

        next();
      } catch (error) {
        next(error);
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);

export default requireAuth;
