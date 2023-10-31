import { RequestHandler } from 'express';
import UserModel from '../models/user';

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
