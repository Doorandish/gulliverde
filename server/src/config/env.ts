import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  MONGODB_URI: z.string().default('mongodb://localhost:27017/gulliver'),
  REDIS_URL: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  OPENWEATHERMAP_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export const env = envSchema.parse(process.env);
