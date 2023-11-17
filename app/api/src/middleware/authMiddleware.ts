import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import asyncHandler from 'express-async-handler';
import { jwtConfig } from '../utils/config';
import { DecodedToken } from '../interfaces/authInterface';

const requireAuth = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          jwtConfig.secret!,
        ) as DecodedToken;

        // Get user_id from token
        req.user_id = decodedToken._id;

        next();
      } catch (err) {
        res.status(403);
        throw new Error('Not authorized, invalid token');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  },
);

export default requireAuth;
