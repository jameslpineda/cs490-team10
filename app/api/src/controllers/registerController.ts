import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/user';
const { v4: uuidv4 } = require('uuid');
import { sendVerificationEmail } from '../utils/sendVerificationUtil'


export const registerUserHandler: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  // TODO check for duplicate username in db
  const user = await UserModel.findOne({ email: email });
  if (user)
    return res.status(400).json({ message: 'Username and already exists.' });
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

    // send the email
    sendVerificationEmail(email, verificationToken);
    res.status(201).send('User registered and verification email sent.');
  } catch (error) {
    next(error);
  }
};

export const verifyUserHandler: RequestHandler = async (req, res, next) => {
  const token = req.query.token;
  console.log("User with following token verified: " + token)
  res.status(201).send("User with following token verified: " + token);
};
