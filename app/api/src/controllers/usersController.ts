import { RequestHandler, Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';

interface CustomRequest extends Request {
  user?: any; // Define a custom 'user' property
}

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getMe: RequestHandler = async (req: CustomRequest, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }
    // const users = await UserModel.find().exec();
    res.status(200).json({
      id: user?._id,
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      pomodoro: user?.pomodoro,
      short_break: user?.short_break,
      long_break: user?.long_break,
    });
  } catch (error) {
    next(error);
  }
};
