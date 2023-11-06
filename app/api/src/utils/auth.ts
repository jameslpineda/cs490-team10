import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../utils/config';
import { DecodedToken } from '../interfaces/authInterface';

const TOKEN_EXP_TIME = '1d';

// Function to hash a password using bcrypt
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Create a JWT token
export const generateJwtToken = (_id: ObjectId) => {
  try {
    return jwt.sign({ _id }, jwtConfig.secret!, { expiresIn: TOKEN_EXP_TIME });
  } catch (error) {
    return null;
  }
};

// Helper function return 403 code on verification error
export const verifyJwtToken = (token: string) => {
  try {
    return jwt.verify(token, jwtConfig.secret!) as DecodedToken;
  } catch (error) {
    return null;
  }
};
