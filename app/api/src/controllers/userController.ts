import { RequestHandler, Response, NextFunction } from 'express';
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

const RESET_TIME = 300000; // 5 minutes = 300000 milliseconds

// @desc Returns info on logged-in user
// @route GET /user/info
// @access Private
export const info = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUser({ _id: req.user_id });
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
  const userExists = await getUser({ email });
  if (userExists) {
    return res
      .status(409)
      .json({ message: 'Email/username and already exists.' });
  }

  try {
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
    const user = await getUser({ email });

    // If the user is not found or the password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if user is verified
    if (!user.is_verified) {
      return res.status(401).json({ message: 'User is not yet verified.' });
    }

    // Generate JWT Token
    const token = generateJwtToken(user._id);

    // Send the token in the response
    res.status(200).json({ _id: user._id, email, token });
  } catch (error) {
    next(error);
  }
};

// @desc Verifies a registered user
// @route PUT /user/verify
// @access Public
export const verify: RequestHandler = async (req, res, next) => {
  try {
    const token = req.query.token;

    // Find the user and verify if they exist
    const updatedUser = await updateUser(
      { verification_token: token as string },
      { is_verified: true },
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
  } catch (error) {
    next(error);
  }
};

// @desc Updates user
// @route POST /user/update
// @access Private
export const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validation = updateUserValidation(req.body);
    if (validation.error) {
      return res
        .status(422)
        .json({ error: validation.error.details[0].message });
    }

    // If request body is empty, do nothing
    if (Object.keys(req.body).length === 0) {
      return res.status(200).json({
        message: 'No changes were made.',
      });
    }

    const data: UserInterface = {};

    // If new password in request body
    if (req.body.new_password) {
      // First check that they provide a current password
      if (!req.body.current_password) {
        return res.status(400).json({
          message: 'Current password is required.',
        });
      }

      // Find the user by email
      const user = await getUser({ _id: req.user_id });

      // Validate password if password is in request body
      if (
        !user ||
        !(await bcrypt.compare(req.body.current_password, user.password!))
      ) {
        return res
          .status(401)
          .json({ message: 'Current password is incorrect.' });
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
      return res
        .status(404)
        .json({ status: 'Invalid or expired verification token.' });
    }

    res.status(200).json({
      message: 'Successfully updated values',
      updatedValues: Object.keys(data),
    });
  } catch (error) {
    next(error);
  }
};

// @desc Sends forgot password link
// @route POST /user/forgot-password
// @access Public
export const forgotPassword: RequestHandler = async (req, res, next) => {
  const validation = forgotPasswordValidation(req.body);
  if (validation.error) {
    // Return a 422 Unprocessable Entity status and error message if validation fails
    return res.status(422).json({ error: validation.error.details[0].message });
  }
  const { email } = req.body;

  try {
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
    return res.status(200).json({
      message:
        'If the provided email address is registered, a password reset link will be sent.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc Resets user password from link
// @route POST /user/reset-password
// @access Public
export const resetPassword: RequestHandler = async (req, res, next) => {
  // Validate all information using the resetPasswordValidation function
  const validation = resetPasswordValidation(req.body);
  if (validation.error) {
    // Return a 422 Unprocessable Entity status and error message if validation fails
    return res.status(422).json({ error: validation.error.details[0].message });
  }
  const { _id, token, password } = req.body;

  try {
    // Verify the user's reset token and check if it's still valid
    const user = await getUser({
      _id,
      reset_password_token: token,
      reset_password_expire_time: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
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

    return res.json({ message: 'Successfully, updated the password' });
  } catch (error) {
    next(error);
  }
};
