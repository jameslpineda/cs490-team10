import * as path from 'path';
import dotenv from 'dotenv';

const env_file =
  process.env.NODE_ENV === 'local'
    ? '../../../../.env.local'
    : '../../../.env.development';

dotenv.config({ path: path.resolve(__dirname, env_file) });

const {
  PORT,
  API_PORT,
  HOST,
  MONGODB_CONNECTION_STRING,
  NODEMAILER_HOST,
  NODEMAILER_USER,
  NODEMAILER_PASS,
  NODEMAILER_PORT,
  NODEMAILER_SERVICE,
  NODEMAILER_SECURE,
  NODE_ENV,
  REST_API_URL,
  FRONTEND_BASE_URL,
} = process.env;

export const coreConfig = {
  port: parseInt(PORT!) || 3000,
  apiPort: parseInt(API_PORT!) || 443,
  env: NODE_ENV || 'development',
  host: HOST || 'localhost',
  restApiUrl: REST_API_URL || 'http://api:443',
  frontendBaseUrl: FRONTEND_BASE_URL || 'http://localhost:3000',
};

export const dbConfig = {
  mongodb: {
    connectionString:
      MONGODB_CONNECTION_STRING || 'mongodb://db:27017/crushit_db',
  },
};

export const nodemailerConfig = {
  user: NODEMAILER_USER,
  options: {
    host: NODEMAILER_HOST || 'smtp.example.com',
    port: Number(NODEMAILER_PORT) || 465,
    secure: Boolean(NODEMAILER_SECURE) || true,
    service: NODEMAILER_SERVICE || 'gmail',
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  },
};
