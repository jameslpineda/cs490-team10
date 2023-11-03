import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import {
  AuthRequestInterface as AuthRequest,
  DecodedToken,
} from '../interfaces/authInterface';

const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      if (!process.env.SECRET) throw new Error('Missing SECRET');
      const decoded = jwt.verify(token, process.env.SECRET) as DecodedToken;

      // get user from token
      const user = await UserModel.findById(decoded._id);
      if (!user || !token) {
        return res
          .status(401)
          .json({ message: 'Not authorized, invalid or no token' });
      }
      req.user = user;

      next();
    } catch (error) {
      res.status(401);
      next(error);
    }
  }
  // if (!token) {
  //   return res.status(401).json({ message: 'Not authorized, no token' });
  // }
};

export default protect;
