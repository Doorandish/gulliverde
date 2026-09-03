import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    duration: String,
    trainLines: [String],
    estimatedCost: Number,
    dayByDay: [
      {
        day: Number,
        title: String,
        stops: [
          {
            time: String,
            title: String,
            description: String,
            cost: Number,
            weather: String,
            type: {
              type: String,
              enum: ['transport', 'activity', 'food', 'accommodation'],
            },
          },
        ],
      },
    ],
    seoTitle: String,
    seoDescription: String,
    locale: { type: String, enum: ['de', 'en'], default: 'de' },
    faqPairs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export const Trip = mongoose.models.Trip || mongoose.model('Trip', tripSchema);
