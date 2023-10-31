import { Request, Response, RequestHandler } from 'express';
import { generateResetToken, hashPassword } from '../utils/auth';
import { createUser, getUser, updateUser } from '../services/auth';
import { sendMail } from '../utils/send-email';
import { forgotPasswordEmailTemplate } from '../utils/email-template';
import { forgotPasswordValidation } from '../validations/forgot-password';
import { resetPasswordValidation } from '../validations/reset-password';
import { coreConfig } from '../utils/config';
const ONE_HOUR = 3600000; // 1 hour = 3600000 milliseconds

export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response
) => {
  console.log(req.body);
  const { email } = req.body;

  // Validate all information using the forgotPasswordValidation function
  const validation = forgotPasswordValidation(req.body);
  if (validation.error) {
    // Return a 422 Unprocessable Entity status and error message if validation fails
    return res.status(422).json({ error: validation.error.details[0].message });
  }

  try {
    // Attempt to find the user by email
    let user = await getUser({ email });

    // Generate a reset token
    const resetToken = generateResetToken();
    const data = {
      resetPasswordToken: resetToken,
      resetPasswordExpireTime: Date.now() + ONE_HOUR,
    };

    if (user) {
      // If the user exists, update their reset information
      user = await updateUser({ id: user._id }, data);
    } else {
      // If the user doesn't exist, create a new user with reset information
      return res.status(400).json({error: 'The user does not exist'});
    }


    // Create a reset URL and email template
    const resetUrl =
      coreConfig.frontendBaseUrl +
      '/reset-password/' +
      user?._id +
      '/' +
      resetToken;
    const template = forgotPasswordEmailTemplate(resetUrl);

    // Send the reset password email
    sendMail(email, 'Reset Password Link', template);
    return res.json({ data: { message: 'Reset password email sent' } });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { id, token, password } = req.body;

  // Validate all information using the resetPasswordValidation function
  const validation = resetPasswordValidation(req.body);
  if (validation.error) {
    // Return a 422 Unprocessable Entity status and error message if validation fails
    return res.status(422).json({ error: validation.error.details[0].message });
  }

  try {
    // Verify the user's reset token and check if it's still valid
    const user = await getUser({
      _id: id,
      resetPasswordToken: token,
      resetPasswordExpireTime: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update the user's password and reset token information
    user.password = await hashPassword(password);
    const data = await updateUser(
      { _id: user._id },
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpireTime: null,
      }
    );
    if (!data) {
      return res.status(400).json({ error: 'Password Reset Failed' });
    }

    return res.json({ data: { message: 'Password reset successfully' } });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
