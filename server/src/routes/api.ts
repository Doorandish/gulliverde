import { Router } from 'express';
import { generateTrip, getPopularRoutes, getTripBySlug, listTrips } from '../controllers/tripController.js';
import { getEvent, getUpcomingEvents, listEvents } from '../controllers/eventController.js';
import { redirectAffiliate } from '../controllers/affiliateController.js';
import { apiLimiter, aiLimiter } from '../middleware/rateLimiter.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = Router();

// Trips
router.post('/trips/generate', aiLimiter, generateTrip);
router.get('/trips/popular', cacheMiddleware(3600), getPopularRoutes);
router.get('/trips/:slug', cacheMiddleware(86400, true), getTripBySlug);
router.get('/trips', cacheMiddleware(3600), listTrips);

// Events
router.get('/events/upcoming', cacheMiddleware(3600), getUpcomingEvents);
router.get('/events/:slug', cacheMiddleware(86400, true), getEvent);
router.get('/events', cacheMiddleware(3600), listEvents);

// Affiliate
router.get('/affiliate/redirect', redirectAffiliate);

// Health
router.get('/health', (req, res) => res.json({ status: 'ok' }));

export default router;
