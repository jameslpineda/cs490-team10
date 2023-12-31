import nodemailer from 'nodemailer';
import 'dotenv/config';
import { coreConfig } from './config';

export const sendVerificationEmail = (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USER, // Your Gmail address
      pass: process.env.NODEMAILER_PASS, // Your Gmail password
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Please verify your email by clicking on the following link:</p>
           <a href="${coreConfig.webBaseUrl}/verify/${token}">Verify Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
