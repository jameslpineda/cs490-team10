import 'dotenv/config';
import app from './app';
import mongoose from 'mongoose';

const port = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Mongoose connected');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.error);
