import { Router } from 'express';
import { getSitemapIndex, getTripSitemap, getEventSitemap, getRobotsTxt } from '../controllers/seoController.js';

const router = Router();

router.get('/sitemap.xml', getSitemapIndex);
router.get('/sitemap-trips.xml', getTripSitemap);
router.get('/sitemap-events.xml', getEventSitemap);
router.get('/robots.txt', getRobotsTxt);

export default router;
