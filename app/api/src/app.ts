import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import userRoutes from './routes/userRoutes';
import { registerRoutes } from './routes/registerRoutes';
import { authRoutes } from './routes/authRoutes';
import createHttpError, { isHttpError } from 'http-errors';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.use('/api/user', userRoutes);

app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found'));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = 'An unknown error has occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
