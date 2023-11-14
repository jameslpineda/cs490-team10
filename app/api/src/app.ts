import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import { corsConfig } from './utils/config';
import { logger } from './middleware/logger';

const app = express();

app.use(cors(corsConfig));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

// routes
app.use('/user', userRoutes);
app.use('/task', taskRoutes);

app.use(errorHandler);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('.json')) {
    res.json({ error: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});

export default app;
