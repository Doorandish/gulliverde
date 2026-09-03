import { Redis } from 'ioredis';
import { env } from './env.js';

let redisClient: Redis | null = null;
const memoryCache = new Map<string, { value: string; expiresAt: number }>();

if (env.REDIS_URL) {
  try {
    redisClient = new Redis(env.REDIS_URL);
    redisClient.on('error', (err: Error) => {
      console.warn('⚠️ Redis error:', err.message);
    });
    console.log('✅ Redis client initialized');
  } catch (err) {
    console.warn('⚠️ Redis initialization failed, using memory cache.', err);
  }
} else {
  console.log('ℹ️ REDIS_URL not set. Using in-memory cache.');
}

export const cacheService = {
  async getCache(key: string): Promise<string | null> {
    if (redisClient && redisClient.status === 'ready') {
      try {
        return await redisClient.get(key);
      } catch {
        // Fallback to memory if redis fails
      }
    }
    const memData = memoryCache.get(key);
    if (memData) {
      if (memData.expiresAt > Date.now()) {
        return memData.value;
      } else {
        memoryCache.delete(key);
      }
    }
    return null;
  },

  async setCache(key: string, value: string, ttlSeconds: number): Promise<void> {
    if (redisClient && redisClient.status === 'ready') {
      try {
        await redisClient.set(key, value, 'EX', ttlSeconds);
        return;
      } catch {
        // Fallback to memory if redis fails
      }
    }
    memoryCache.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }
};

export default redisClient;
