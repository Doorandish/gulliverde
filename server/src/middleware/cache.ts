import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { cacheService } from '../config/redis.js';

export const cacheMiddleware = (ttlSeconds: number, isPSEO: boolean = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = crypto.createHash('sha256').update(req.originalUrl).digest('hex');

    try {
      const cached = await cacheService.getCache(key);
      if (cached) {
        if (isPSEO) {
          res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
        }
        res.setHeader('Content-Type', 'application/json');
        return res.send(cached);
      }
    } catch (err) {
      console.warn('Cache get error:', err);
    }

    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      try {
        const bodyStr = typeof body === 'string' ? body : JSON.stringify(body);
        cacheService.setCache(key, bodyStr, ttlSeconds);
      } catch (err) {
        console.warn('Cache set error:', err);
      }
      
      if (isPSEO) {
        res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800');
      }
      return originalJson(body);
    };

    next();
  };
};
