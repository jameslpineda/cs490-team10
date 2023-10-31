import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

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
