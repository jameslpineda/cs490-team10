import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const TOKEN_EXP_TIME = '1d';

// Function to hash a password using bcrypt
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Create a JWT token
export const generateJwtToken = (_id: ObjectId) => {
  if (!process.env.SECRET) {
    throw new Error('JWT Secret missing');
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: TOKEN_EXP_TIME });
};
