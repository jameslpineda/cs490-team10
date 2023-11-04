import bcrypt from 'bcrypt';
import UserModel from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';
import { RequestHandler, Response, NextFunction } from 'express';
import { sendVerificationEmail } from '../utils/sendVerificationUtil';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { generateToken } from '../utils/auth';
import {
  signUpValidation,
  signInValidation,
} from '../validations/userValidation';

// @desc Returns info on logged-in user
// @route GET /user/info
// @access Private
export const info = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await UserModel.findById(req.user_id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      pomodoro: user.pomodoro,
      short_break: user.short_break,
      long_break: user.long_break,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Registers new user
// @route POST /user/sign-up
// @access Public
export const signUp: RequestHandler = async (req, res, next) => {
  const validation = signUpValidation(req.body);
  if (validation.error) {
    return res.status(422).json({ error: validation.error.details[0].message });
  }
  const { email, password } = req.body;

  // Check if user exists
  const userExists = await UserModel.findOne({ email: email });
  if (userExists) {
    return res
      .status(409)
      .json({ message: 'Email/username and already exists.' });
  }

  try {
    const verificationToken = uuidv4();

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      verification_token: verificationToken,
    });

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        message: 'User registered and verification email sent.',
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc Authenticates a user
// @route POST /user/sign-in
// @access Public
export const signIn: RequestHandler = async (req, res, next) => {
  const validation = signInValidation(req.body);
  if (validation.error) {
    return res.status(422).json({ error: validation.error.details[0].message });
  }
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    // If the user is not found or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password!))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if user is verified
    if (!user.is_verified) {
      return res.status(401).json({ message: 'User is not yet verified.' });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    // Send the token in the response
    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    next(error);
  }
};

// @desc Verifies a registered user
// @route PUT /user/verify
// @access Public
export const verify: RequestHandler = async (req, res) => {
  const token = req.query.token;

  // Find the user and verify if they exist
  const updatedUser = await UserModel.findOneAndUpdate(
    { verification_token: token },
    {
      $set: { is_verified: true },
    },
    { new: true },
  );

  // If the update failed
  if (!updatedUser) {
    return res
      .status(404)
      .json({ status: 'Invalid or expired verification token.' });
  }
  res
    .status(200)
    .json({ message: 'User with following token verified: ' + token });
};
