import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import './config/redis.js'; // Initialize Redis client
import apiRoutes from './routes/api.js';
import seoRoutes from './routes/seo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://images.unsplash.com", "https://*.unsplash.com"],
        connectSrc: ["'self'", "https://images.unsplash.com", "https://*.unsplash.com"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(morgan('dev'));

// Connect DB
connectDB();

// SEO routes (root level)
app.use('/', seoRoutes);

// API routes
app.use('/api', apiRoutes);

// Serve frontend static files
const frontendDistPath = path.resolve(__dirname, '../../front/dist');
app.use(express.static(frontendDistPath));

app.get('{*path}', (req: Request, res: Response) => {
  // If request starts with /api, return 404
  if (req.path.startsWith('/api')) {
    res.status(404).json({ error: 'API route not found' });
    return;
  }
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${env.NODE_ENV} mode`);
});
