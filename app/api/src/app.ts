import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import { registerRoutes } from './routes/registerRoutes';
import { authRoutes } from './routes/authRoutes';
import { corsConfig } from './utils/config';

const app = express();

app.use(cors(corsConfig));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/user', userRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('.json')) {
    res.json({ message: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

app.use(errorHandler);

export default app;
