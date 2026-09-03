import mongoose from 'mongoose';

const affiliateLogSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ['omio', 'db', 'booking', 'gyg'],
      required: true,
    },
    destination: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    locale: String,
    referer: String,
  }
);

export const AffiliateLog = mongoose.models.AffiliateLog || mongoose.model('AffiliateLog', affiliateLogSchema);
