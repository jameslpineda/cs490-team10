import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import asyncHandler from 'express-async-handler';
import { jwtConfig } from '../utils/config';

const requireAuth = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtConfig.access_token_secret!, (err, decoded) => {
      if (err || !decoded || typeof decoded === 'string') {
        res.status(403);
        throw new Error('Not authorized, invalid token');
      }

      // Get user_id from token
      req.user_id = decoded._id;
      next();
    });
  },
);

export default requireAuth;
