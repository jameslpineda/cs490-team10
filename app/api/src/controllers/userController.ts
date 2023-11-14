import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import { AuthRequestInterface as AuthRequest } from '../interfaces/authInterface';
import { generateJwtToken } from '../utils/auth';
import { getUser, updateUser, createUser } from '../services/userService';
import { randomUUID } from 'crypto';
import { coreConfig } from '../utils/config';
import { sendMail } from '../utils/sendEmail';
import { forgotPasswordEmailTemplate } from '../templates/emailTemplate';
import { hashPassword } from '../utils/auth';
import {
  signUpValidation,
  signInValidation,
  updateUserValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
} from '../validations/userValidation';
import { UserInterface } from '../interfaces/userInterface';
import asyncHandler from 'express-async-handler';

const RESET_TIME = 300000; // 5 minutes = 300000 milliseconds

// @desc Returns info on logged-in user
// @route GET /user/info
// @access Private
export const info = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await getUser({ _id: req.user_id });
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json({
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    pomodoro: user.pomodoro,
    short_break: user.short_break,
    long_break: user.long_break,
  });
});

// @desc Registers new user
// @route POST /user/sign-up
// @access Public
export const signUp = asyncHandler(async (req, res) => {
  const validation = signUpValidation(req.body);
  if (validation.error) {
    res.status(422);
    throw new Error(validation.error.details[0].message);
  }
  const { email, password } = req.body;

  // Check if user exists
  const userExists = await getUser({ email });
  if (userExists) {
    res.status(409);
    throw new Error('Email/username and already exists.');
  }

  const verificationToken = randomUUID();

  // Encrypt password
  const hashedPassword = await hashPassword(password);

  // Create new user
  const user = await createUser({
    email,
    password: hashedPassword,
    verification_token: verificationToken,
  });
  if (!user) {
    throw new Error('Error creating user');
  }

  // Send verification email
  sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    email: user.email,
    message: 'User registered and verification email sent.',
  });
});

// @desc Authenticates a user
// @route POST /user/sign-in
// @access Public
export const signIn = asyncHandler(async (req, res) => {
  const validation = signInValidation(req.body);
  if (validation.error) {
    res.status(422);
    throw new Error(validation.error.details[0].message);
  }
  const { email, password } = req.body;

  // Find the user by email
  const user = await getUser({ email });

  // If the user is not found or the password is incorrect
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid email or password.');
  }

  // Check if user is verified
  if (!user.is_verified) {
    res.status(401);
    throw new Error('User is not yet verified.');
  }

  // Generate JWT Token
  const token = generateJwtToken(user._id);
  if (!token) {
    res.status(500);
    throw new Error('Failed to create JWT Token');
  }

  // Send the token in the response
  res.status(200).json({
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email,
    token,
  });
});

// @desc Verifies a registered user
// @route PUT /user/verify
// @access Public
export const verify = asyncHandler(async (req: Request, res: Response) => {
  const token = req.query.token;

  // Find the user and verify if they exist
  const updatedUser = await updateUser(
    { verification_token: token as string },
    { is_verified: true },
  );

  // If the update failed
  if (!updatedUser) {
    res.status(404);
    throw new Error('Invalid or expired verification token');
    // .json({ status: 'Invalid or expired verification token.' });
  }

  res
    .status(200)
    .json({ message: 'User with following token verified: ' + token });
});

// @desc Updates user
// @route POST /user/update
// @access Private
export const update = asyncHandler(async (req: AuthRequest, res: Response) => {
  const validation = updateUserValidation(req.body);
  if (validation.error) {
    res.status(422);
    throw new Error(validation.error.details[0].message);
  }

  const data: UserInterface = {};

  // If new password in request body
  if (req.body.new_password) {
    // First check that they provide a current password
    if (!req.body.current_password) {
      res.status(400);
      throw new Error('Current password is required.');
    }

    // Find the user by email
    const user = await getUser({ _id: req.user_id });

    // Validate password if password is in request body
    if (
      !user ||
      !(await bcrypt.compare(req.body.current_password, user.password!))
    ) {
      res.status(401);
      throw new Error('Current password is incorrect.');
    }

    // Encrypt and add new password to update field
    const hashedPassword = await hashPassword(req.body.new_password);
    data['password'] = hashedPassword;
  }

  // Add parameters to be updated
  if (req.body.first_name) {
    data.first_name = req.body.first_name;
  }
  if (req.body.last_name) {
    data.last_name = req.body.last_name;
  }
  if (req.body.pomodoro) {
    data.pomodoro = req.body.pomodoro;
  }
  if (req.body.short_break) {
    data.short_break = req.body.short_break;
  }
  if (req.body.long_break) {
    data.long_break = req.body.long_break;
  }

  // Find the user and verify if they exist
  const updatedUser = await updateUser({ _id: req.user_id }, data);

  // If the update failed
  if (!updatedUser) {
    res.status(404);
    throw new Error('Invalid or expired verification token.');
  }

  res.status(200).json({
    message: 'Successfully updated values',
    updatedValues: Object.keys(data),
  });
});

// @desc Sends forgot password link
// @route POST /user/forgot-password
// @access Public
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const validation = forgotPasswordValidation(req.body);
    if (validation.error) {
      // Return a 422 Unprocessable Entity status and error message if validation fails
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }
    const { email } = req.body;

    // Generate a reset token
    const resetToken = randomUUID();
    const data = {
      reset_password_token: resetToken,
      reset_password_expire_time: Date.now() + RESET_TIME,
    };

    // Attempt to find the user by email
    const user = await getUser({ email });
    if (user) {
      // If the user exists, update their reset information
      const updatedUser = await updateUser({ _id: user._id }, data);
      if (!updatedUser) {
        throw new Error('Update user failed');
      }

      // Create a reset URL and email template
      const resetUrl =
        coreConfig.webBaseUrl +
        '/reset-password/' +
        updatedUser._id +
        '/' +
        resetToken;
      const template = forgotPasswordEmailTemplate(resetUrl);

      // Send the reset password email
      sendMail(email, 'Reset Password Link', template);
    }
    res.status(200).json({
      message:
        'If the provided email address is registered, a password reset link will be sent.',
    });
  },
);

// @desc Resets user password from link
// @route POST /user/reset-password
// @access Public
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    // Validate all information using the resetPasswordValidation function
    const validation = resetPasswordValidation(req.body);
    if (validation.error) {
      // Return a 422 Unprocessable Entity status and error message if validation fails
      res.status(422);
      throw new Error(validation.error.details[0].message);
    }
    const { _id, token, password } = req.body;

    // Verify the user's reset token and check if it's still valid
    const user = await getUser({
      _id,
      reset_password_token: token,
      reset_password_expire_time: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400);
      throw new Error('Invalid or expired token');
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's password and reset token information
    user.password = await hashPassword(password);
    const data = await updateUser(
      { _id: user._id },
      {
        password: hashedPassword,
        reset_password_token: null,
        reset_password_expire_time: null,
      },
    );
    if (!data) {
      throw new Error('Password Reset Failed');
    }

    res.json({ message: 'Successfully, updated the password' });
  },
);
