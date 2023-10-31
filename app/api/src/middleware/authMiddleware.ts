import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';

interface CustomRequest extends Request {
  user?: any; // Define a custom 'user' property
}
interface DecodedToken extends JwtPayload {
  _id: any;
}

const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1];

      // verify token
      const decoded = jwt.verify(token, process.env.SECRET!) as DecodedToken;

      // get user from token
      req.user = await UserModel.findById(decoded._id);

      next();
    } catch (error) {
      next(error);
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
