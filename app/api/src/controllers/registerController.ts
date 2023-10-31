import { RequestHandler } from 'express';
import path from 'path';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
const { v4: uuidv4 } = require('uuid');

export const registerUserHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  // TODO check for duplicate username in db
  const user = await UserModel.findOne({ email: email });
  if (user)
    return res.status(400).json({ message: 'Username and already exits.' });
  try {
    const verificationToken = uuidv4();
    const expireTime = Date.now() + 15 * 60 * 1000;

    // encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // store new user
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      resetVerificationPasswordToken: verificationToken,
      expireTime,
    });
    await newUser.save();
    // TODO send verification email
    res.status(201).send('User registered and verification email sent.');
  } catch (error) {
    next(error);
  }
};
