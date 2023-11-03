import nodemailer from 'nodemailer';
import { nodemailerConfig } from './config';

type Credentials = {
  user: string;
  pass: string;
};

export type MailOptions = {
  host: string | undefined;
  port: number | undefined;
  auth: Credentials | undefined;
  secure: boolean | undefined;
  service: string | undefined;
};

export type Options = {
  from: string | undefined;
  to: string | undefined;
  subject: string | undefined;
  html: string | Buffer | undefined;
};

// Define the sendMail function with proper type annotations
export const sendMail = async (
  email: string,
  subject: string,
  mailBody: string,
): Promise<boolean | undefined> => {
  const mailOptions: Options = {
    from: nodemailerConfig.user,
    to: email,
    subject,
    html: mailBody,
  };
  try {
    const transporter: nodemailer.Transporter = nodemailer.createTransport(
      nodemailerConfig.options as MailOptions,
    );
    const res = await transporter.sendMail(mailOptions);
    if (!res) return false;
    return true;
  } catch (error) {
    console.log(error);
  }
};
