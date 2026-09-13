import mongoose from 'mongoose';

import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    logger.info('DB CONNECTED');
  } catch (err) {
    logger.error(`Failed to connect to the database: ${err}`);
    process.exit(1); // Exit process with failure
  }
};
