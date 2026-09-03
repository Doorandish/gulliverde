import { Request, Response } from 'express';
import { generateSitemapIndex, generateTripSitemap, generateEventSitemap } from '../services/sitemapGenerator.js';

export const getSitemapIndex = (req: Request, res: Response) => {
  res.header('Content-Type', 'application/xml');
  res.send(generateSitemapIndex());
};

export const getTripSitemap = async (req: Request, res: Response) => {
  const sitemap = await generateTripSitemap();
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
};

export const getEventSitemap = async (req: Request, res: Response) => {
  const sitemap = await generateEventSitemap();
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
};

export const getRobotsTxt = (req: Request, res: Response) => {
  res.header('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: https://gulliver.doorandish.app/sitemap.xml
`);
};
