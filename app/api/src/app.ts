import 'dotenv/config';
import express from 'express';
import UserModel from './models/user';

const app = express();

app.get('/', async (req, res) => {
  const users = await UserModel.find().exec();
  res.status(200).json(users);
});

export default app;
