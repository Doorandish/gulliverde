import { Trip } from '../models/Trip.js';
import { EventModel } from '../models/Event.js';
import mongoose from 'mongoose';

const BASE_URL = 'https://gulliver.doorandish.app';

export const generateSitemapIndex = () => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-trips.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-events.xml</loc>
  </sitemap>
</sitemapindex>`;
};

const mockTrips = ['berlin-nach-prag-mit-dem-zug', 'muenchen-nach-salzburg'];
const mockEvents = ['nuernberg-christkindlesmarkt-2026', 'muenchen-oktoberfest-2026'];

export const generateTripSitemap = async () => {
  let slugs = mockTrips;
  if (mongoose.connection.readyState === 1) {
    try {
      const trips = await Trip.find({}, 'slug updatedAt').lean();
      if (trips.length > 0) {
        slugs = trips.map((t: any) => t.slug);
      }
    } catch (e) {
      console.error('Error fetching trips for sitemap:', e);
    }
  }

  const urls = slugs.map(slug => `
  <url>
    <loc>${BASE_URL}/trips/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const generateEventSitemap = async () => {
  let slugs = mockEvents;
  if (mongoose.connection.readyState === 1) {
    try {
      const events = await EventModel.find({}, 'slug updatedAt').lean();
      if (events.length > 0) {
        slugs = events.map((e: any) => e.slug);
      }
    } catch (e) {
      console.error('Error fetching events for sitemap:', e);
    }
  }

  const urls = slugs.map(slug => `
  <url>
    <loc>${BASE_URL}/events/${slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};
