import mongoose from 'mongoose';
import { dbConfig } from '../utils/config';
mongoose.set('strictQuery', true);

export const connectToDatabase = async () => {
  // Mongoose Connection Information
  mongoose.connect(dbConfig.mongodb.URI)

  mongoose.connection.on('connected', () => {
    console.info('Success! Connected to Database.');
  });

  mongoose.connection.on('disconnected', () => {
    console.error('!!!!!!!!!! Database Disconnected !!!!!!!!!!');
  });

  mongoose.connection.on('reconnected', () => {
    console.warn('!!!!!!!!!! Database Reconnected  !!!!!!!!!!');
  });

  mongoose.connection.on('error', (error) => {
    console.error('Failed! Database connection failed. \n', error);
  });
};

