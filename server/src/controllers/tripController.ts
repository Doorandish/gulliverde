import { Request, Response } from 'express';
import { generateItinerary } from '../services/gemini.js';
import { buildTripSlug } from '../utils/slugify.js';
import { Trip } from '../models/Trip.js';
import mongoose from 'mongoose';

const mockPopularRoutes = [
  { title: "Salzburg im Herbst", origin: "München", destination: "Salzburg", duration: "2h 10m", price: "ab 79€" },
  { title: "Schwarzwald Wanderwochenende", origin: "Frankfurt", destination: "Freiburg", duration: "3h 40m", price: "ab 55€" },
  { title: "Chiemgau-Wochenende", origin: "München", destination: "Prien", duration: "1h 20m", price: "ab 39€" },
  { title: "Augsburg Frühlingsfest", origin: "München", destination: "Augsburg", duration: "0h 37m", price: "ab 22€" },
  { title: "Berchtesgaden & Königssee", origin: "München", destination: "Berchtesgaden", duration: "2h 35m", price: "ab 49€" },
  { title: "Zürich Kulturwochenende", origin: "Stuttgart", destination: "Zürich", duration: "3h 55m", price: "ab 89€" }
];

export const generateTrip = async (req: Request, res: Response) => {
  try {
    const { origin, destination, duration } = req.body;
    const slug = buildTripSlug(origin, destination);

    const itinerary = await generateItinerary(req.body);
    
    let tripDoc;
    if (mongoose.connection.readyState === 1) {
      tripDoc = await Trip.findOneAndUpdate(
        { slug },
        {
          origin,
          destination,
          slug,
          duration,
          dayByDay: itinerary.dayByDay,
        },
        { upsert: true, new: true }
      );
    } else {
      tripDoc = { origin, destination, slug, duration, dayByDay: itinerary.dayByDay };
    }

    res.json(tripDoc);
  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
};

export const getTripBySlug = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const trip = await Trip.findOne({ slug: req.params.slug });
      if (trip) {
        return res.json(trip);
      }
    }
    // Mock fallback
    res.json({
      slug: req.params.slug,
      origin: 'Mock Origin',
      destination: 'Mock Destination',
      dayByDay: []
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const listTrips = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const trips = await Trip.find().limit(20);
      return res.json(trips);
    }
    res.json([]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPopularRoutes = async (req: Request, res: Response) => {
  res.json(mockPopularRoutes);
};
