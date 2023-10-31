const {
    PORT,
    HOST,
    MONGODB_URI,
    NODEMAILER_HOST,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    NODEMAILER_PORT,
    NODEMAILER_SERVICE,
    NODEMAILER_SECURE,
    NODE_ENV,
    REST_API_PREFIX,
    FRONTEND_BASE_URL
} = process.env;

export const coreConfig = {
    port: parseInt(PORT!) || 3000,
    env: NODE_ENV || 'DEVELOPMENT',
    host: HOST || 'localhost',
    restApiPrefix: REST_API_PREFIX || 'api',
    frontendBaseUrl: FRONTEND_BASE_URL || 'http://localhost:3001'
};

export const dbConfig = {
    mongodb: {
        URI: MONGODB_URI || 'mongodb://127.0.0.1:27017/forgot-password',
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