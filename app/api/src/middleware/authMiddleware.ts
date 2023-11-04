import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import {
  AuthRequestInterface as AuthRequest,
  DecodedToken,
} from '../interfaces/authInterface';

const verifyToken = (token: string) => {
  try {
    // Verify token
    if (!process.env.SECRET) {
      throw new Error('Missing SECRET');
    }

    const decoded = jwt.verify(token, process.env.SECRET) as DecodedToken;

    return decoded;
  } catch (error) {
    // Token is not valid
    return null;
  }
};

const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Decode token
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return res
          .status(403)
          .json({ message: 'Not authorized, invalid token' });
      }

      // Get user_id from token
      req.user_id = decodedToken._id;

      next();
    } catch (error) {
      // res.status(401);
      next(error);
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default requireAuth;
