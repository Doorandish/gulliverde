import { Request, Response } from 'express';
import { resolveAffiliateUrl } from '../services/affiliateRedirector.js';
import { AffiliateLog } from '../models/AffiliateLog.js';
import mongoose from 'mongoose';

export const redirectAffiliate = async (req: Request, res: Response) => {
  const { provider, dest, origin } = req.query;

  if (!provider || typeof provider !== 'string' || !dest || typeof dest !== 'string') {
    return res.status(400).send('Missing provider or destination');
  }

  const redirectUrl = resolveAffiliateUrl(provider, typeof origin === 'string' ? origin : '', dest);

  if (mongoose.connection.readyState === 1) {
    try {
      await AffiliateLog.create({
        provider,
        destination: dest,
        locale: req.acceptsLanguages()[0] || 'unknown',
        referer: req.get('Referrer') || 'unknown'
      });
    } catch (e) {
      console.error('Failed to log affiliate click:', e);
    }
  }

  res.redirect(302, redirectUrl);
};
