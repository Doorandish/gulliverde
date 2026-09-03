import { Request, Response, NextFunction } from 'express';

const requests = new Map<string, { count: number; startTime: number }>();

const WINDOW_MS = 60 * 1000;

export const rateLimiter = (maxRequests: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    let record = requests.get(ip);
    
    if (!record) {
      record = { count: 0, startTime: now };
      requests.set(ip, record);
    }

    if (now - record.startTime > WINDOW_MS) {
      record.startTime = now;
      record.count = 1;
    } else {
      record.count++;
    }

    if (record.count > maxRequests) {
      res.setHeader('Retry-After', Math.ceil((WINDOW_MS - (now - record.startTime)) / 1000));
      res.status(429).json({ error: 'Too many requests' });
      return;
    }

    next();
  };
};

export const apiLimiter = rateLimiter(100);
export const aiLimiter = rateLimiter(10);
