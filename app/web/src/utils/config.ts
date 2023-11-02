import * as path from 'path';

const env_file = '../../../.env.local';

const { PORT, API_PORT, HOST, NODE_ENV, REST_API_URL, FRONTEND_BASE_URL } =
  process.env;

export const coreConfig = {
  port: parseInt(PORT!) || 3000,
  apiPort: parseInt(API_PORT!) || 443,
  env: NODE_ENV || 'development',
  host: HOST || 'localhost',
  restApiUrl: 'http://localhost:443',
  frontendBaseUrl: FRONTEND_BASE_URL || 'http://localhost:3000',
};
