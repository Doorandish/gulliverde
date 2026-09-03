import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema(
  {
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    duration: String,
    trainLines: [String],
    estimatedCost: Number,
    totalBudget: Number,
    co2SavedPercent: Number,
    days: [
      {
        dayNumber: Number,
        title: String,
        date: String,
        activities: [
          {
            timeSlot: String,
            title: String,
            description: String,
            estimatedPrice: Number,
            weatherNote: String,
            bookingUrl: String,
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
