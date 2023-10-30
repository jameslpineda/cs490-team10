import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import { run } from './lib/db';
import { coreConfig } from './utils/config';
import authRoutes from './routes/auth';
import { connectToDatabase } from './lib/connectToDatabase';

const bootstrap = async () => {
  // Create an Express application
  const app = express();

  // Initialize the database connection
  run().catch(console.dir);
  await connectToDatabase();

  // Use the body-parser middleware to parse JSON request bodies
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // Use the 'cors' middleware to handle CORS headers and pre-flight requests
  app.use(cors({
    origin: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
    credentials: true,
  }));

  // API routes
  app.use('/api', authRoutes);

  // Start the Express server
  app.listen(coreConfig.port, () => {
    console.log(`Server listening on port ${coreConfig.port}`);
  });

  // Set trust proxy to enable 'X-Forwarded-For' header
  app.set('trust proxy', true);

  // Handle unexpected router hits by returning a 404 error
  app.all('*', (req, res, next) => {
    next(
      res.status(404).json({ err: `Can't find ${req.originalUrl} on this server!` })
    );
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: any) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  });

  // Handle SIGTERM signal
  process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  });
};

(async () => {
  await bootstrap();
})();
