import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';
import {
  AuthRequestInterface as AuthRequest,
  DecodedToken,
} from '../interfaces/authInterface';
import { generateAccessToken, generateRefreshToken } from '../utils/auth';
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
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { jwtConfig } from '../utils/config';

const RESET_TIME = 300000; // 5 minutes = 300000 milliseconds

// @desc Returns info on signed-in user
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
    throw new Error('Email/username already exists');
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
    throw new Error('Failed to create new user');
  }

  // Send verification email
  sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    email: user.email,
    message: 'User registered and verification email sent',
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
    throw new Error('Invalid email or password');
  }

  // Check if user is verified
  if (!user.is_verified) {
    res.status(401);
    throw new Error('User is not yet verified');
  }

  // Generate Access Token
  const accessToken = generateAccessToken(user._id);
  if (!accessToken) {
    throw new Error('Failed to create Access Token');
  }
  // Generate Refresh Token
  const refreshToken = generateRefreshToken(user._id);
  if (!refreshToken) {
    throw new Error('Failed to create Refresh Token');
  }

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true, // secure: true - only serves on https
    sameSite: 'none',
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  // Save refresh token to User
  const updatedUser = await updateUser(
    { _id: user._id },
    { refresh_token: refreshToken },
  );

  // If the update failed
  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  // Send the token in the response
  res.status(200).json({
    accessToken,
    user: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      pomodoro: user.pomodoro,
      short_break: user.short_break,
      long_break: user.long_break,
    },
  });
});

// @desc Signs out a user
// @route POST /user/sign-out
// @access Public
export const signOut = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;

  // Find the user by email
  const user = await getUser({ refresh_token: refreshToken });
  if (!user) {
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
  }

  // Delete refresh token in db
  // Save refresh token to User
  const updatedUser = await updateUser(
    { _id: user!._id },
    { refresh_token: '' },
  );

  // If the update failed
  if (!updatedUser) {
    throw new Error('Failed to update user.');
  }

  res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });

  res.status(200).json({ message: 'Successfully signed out' });
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
    throw new Error('Failed to update user.');
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
  if ('new_password' in req.body) {
    // First check that they provide a current password
    if (!('current_password' in req.body)) {
      res.status(400);
      throw new Error('Current password is required');
    }

    // Find the user by email
    const user = await getUser({ _id: req.user_id });

    // Validate password if password is in request body
    if (
      !user ||
      !(await bcrypt.compare(req.body.current_password, user.password!))
    ) {
      res.status(401);
      throw new Error('Current Password is incorrect');
    }

    // Encrypt and add new password to update field
    const hashedPassword = await hashPassword(req.body.new_password);
    data.password = hashedPassword;
  }

  // Add parameters to be updated
  if ('first_name' in req.body) {
    data.first_name = req.body.first_name;
  }
  if ('last_name' in req.body) {
    data.last_name = req.body.last_name;
  }
  if ('pomodoro' in req.body) {
    data.pomodoro = req.body.pomodoro;
  }
  if ('short_break' in req.body) {
    data.short_break = req.body.short_break;
  }
  if ('long_break' in req.body) {
    data.long_break = req.body.long_break;
  }

  // Find the user and verify if they exist
  const updatedUser = await updateUser({ _id: req.user_id }, data);

  // If the update failed
  if (!updatedUser) {
    throw new Error('Failed to update user');
  }

  res.status(200).json({
    message: 'Successfully updated values',
    user: {
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      pomodoro: updatedUser.pomodoro,
      short_break: updatedUser.short_break,
      long_break: updatedUser.long_break,
    },
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
        throw new Error('Failed to update user with reset information');
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
        'If the provided email address is registered, a reset password link will be sent.',
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

// @desc Refreshes the authentication token
// @route POST /user/refresh-token
// @access Public
export const refreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.status(401);
    throw new Error('Not authorized, no refresh token');
  }

  const refreshToken = cookies.jwt;

  // Find the user by refreshToken
  const user = await getUser({ refresh_token: refreshToken });
  if (!user) {
    res.status(403);
    throw new Error('Forbidden, invalid refresh token');
  }
  const user_id = user._id.toString();

  jwt.verify(
    refreshToken,
    jwtConfig.refresh_token_secret!,
    (err: VerifyErrors | null, decoded: string | object | undefined) => {
      const decodedToken = decoded as DecodedToken;
      if (err || user_id !== decodedToken._id.toString()) {
        res.status(403);
        throw new Error('Not authorized, invalid refresh token');
      }

      // Generate Access Token
      const accessToken = generateAccessToken(user._id);
      if (!accessToken) {
        throw new Error('Failed to create Access Token');
      }
      res.status(200).json({
        accessToken,
        user: {
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          pomodoro: user.pomodoro,
          short_break: user.short_break,
          long_break: user.long_break,
        },
      });
    },
  );
});
