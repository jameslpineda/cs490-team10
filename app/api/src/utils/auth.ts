import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const TOKEN_EXP_TIME = '7d';

// Function to generate a random reset token (UUID)
export const generateResetToken = (): string => {
  return randomUUID();
};

// Function to hash a password using bcrypt
export const hashPassword = (password: string) => {
  // Hash the provided password using bcrypt with a cost factor of 10
  // The higher the cost factor, the slower the hashing process (more secure)
  // Returns a promise that resolves to the hashed password
  return bcrypt.hash(password, 10);
};

// Create a JWT token
export const generateToken = (_id: ObjectId) => {
  if (!process.env.SECRET) {
    throw new Error('JWT Secret missing');
  }
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: TOKEN_EXP_TIME });
};
