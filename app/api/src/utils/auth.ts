import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { jwtConfig } from '../utils/config';
import { Response } from 'express';

const TOKEN_EXP_TIME = '1d';
const TOKEN_EXP_TIME_MS = 24 * 60 * 60 * 1000;

// Function to hash a password using bcrypt
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Create a JWT token
export const generateJwtToken = (res: Response, _id: ObjectId) => {
  try {
    const token = jwt.sign({ _id }, jwtConfig.secret!, {
      expiresIn: TOKEN_EXP_TIME,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: TOKEN_EXP_TIME_MS,
    });

    return token;
  } catch (error) {
    return null;
  }
};
