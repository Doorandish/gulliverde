import { Request, Response } from 'express';
import { EventModel } from '../models/Event.js';
import mongoose from 'mongoose';

const mockEvents = [
  { slug: "muenchen-oktoberfest-2026", title: "München Oktoberfest 2026", date: "Sep 19 - Oct 4", category: "Festival" },
  { slug: "nuernberg-christkindlesmarkt-2026", title: "Nürnberg Christkindlesmarkt 2026", date: "Nov 27 - Dec 24", category: "Weihnachtsmarkt" },
  { slug: "koelner-karneval-2027", title: "Kölner Karneval 2027", date: "Feb 11 - Feb 17", category: "Festival" }
];

export const getEvent = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const event = await EventModel.findOne({ slug: req.params.slug });
      if (event) {
        return res.json(event);
      }
    }
    const mock = mockEvents.find(e => e.slug === req.params.slug);
    if (mock) return res.json(mock);
    
    res.status(404).json({ error: 'Event not found' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const listEvents = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const events = await EventModel.find().limit(20);
      return res.json(events);
    }
    res.json(mockEvents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUpcomingEvents = async (req: Request, res: Response) => {
  res.json(mockEvents);
};
