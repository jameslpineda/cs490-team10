import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { jwtConfig } from '../utils/config';

const ACCESS_TOKEN_EXP_TIME = '15s';
const REFRESH_TOKEN_EXP_TIME = '60s';

// Function to hash a password using bcrypt
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Create a JWT token
export const generateAccessToken = (_id: ObjectId) => {
  try {
    const accessToken = jwt.sign({ _id }, jwtConfig.access_token_secret!, {
      expiresIn: ACCESS_TOKEN_EXP_TIME,
    });

    return accessToken;
  } catch (error) {
    return null;
  }
};

// Create a JWT token
export const generateRefreshToken = (_id: ObjectId) => {
  try {
    const token = jwt.sign({ _id }, jwtConfig.refresh_token_secret!, {
      expiresIn: REFRESH_TOKEN_EXP_TIME,
    });

    return token;
  } catch (error) {
    return null;
  }
};
