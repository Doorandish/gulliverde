import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
    city: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
    startDate: Date,
    endDate: Date,
    description: String,
    trainDistanceFromHbf: String,
    budgetPriceTable: [
      {
        item: String,
        price: Number,
      },
    ],
    category: String,
    imageUrl: String,
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export const EventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);
