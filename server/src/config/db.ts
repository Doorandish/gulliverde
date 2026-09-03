import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  try {
    if (!env.MONGODB_URI) {
      console.warn('⚠️ MONGODB_URI is not set. Running without database.');
      return;
    }
    
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️ MongoDB connection failed. Continuing with mock data.', error);
  }
};
