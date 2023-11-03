import app from './app';
import mongoose from 'mongoose';
import { coreConfig, dbConfig } from './utils/config';

mongoose
  .connect(dbConfig.mongodb.connectionString)
  .then(() => {
    console.log('Mongoose connected');
    app.listen(coreConfig.apiPort, () => {
      console.log(`Server listening on port ${coreConfig.apiPort}`);
    });
  })
  .catch(console.error);
