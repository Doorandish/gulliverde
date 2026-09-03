import { env } from '../config/env.js';

interface ItineraryParams {
  origin: string;
  destination: string;
  budget?: string;
  style?: string;
  duration?: string;
  locale?: string;
  weather?: any;
}

export const generateItinerary = async (params: ItineraryParams) => {
  const destination = params.destination;
  console.log("GEMINI KEY PRESENT:", !!env.GEMINI_API_KEY);
  console.log(`[Gemini] Generating itinerary for destination: ${destination}`);

  const MOCK_ITINERARY = {
    destination: destination,
    durationDays: 2,
    totalBudget: 140,
    co2SavedPercent: 78,
    trainDetails: {
      recommendedRoute: "Direktverbindung / RE / ICE",
      ticketStartingPrice: 39
    },
    days: [
      {
        dayNumber: 1,
        title: "Ankunft & Altstadt-Erkundung",
        activities: [
          {
            timeSlot: "Morgen",
            title: "Ankunft am Hauptbahnhof & Kaffee in der Altstadt",
            description: "Bummel durch die historischen Gassen und regionaler Frühstücksstopp.",
            estimatedPrice: 12,
            weatherNote: "Ideal bei jedem Wetter"
          }
        ]
      }
    ]
  };

  if (!env.GEMINI_API_KEY) {
    console.log(`ℹ️ No GEMINI_API_KEY found, returning mock itinerary for ${destination}`);
    return MOCK_ITINERARY;
  }

  const prompt = `You are an expert travel planner for Germany and Europe. 
Generate a 2-day realistic itinerary for the city of ${destination}. Use real, famous locations in ${destination} (e.g. if Berlin: Museumsinsel, Brandenburger Tor, Kreuzberg - DO NOT use generic Franconian/Bavarian text). 
Return strict JSON with positive numbers for prices. Return ONLY a valid raw JSON object (without markdown blocks) matching this format:
{
  "destination": "${destination}",
  "durationDays": 2,
  "totalBudget": 140,
  "co2SavedPercent": 78,
  "trainDetails": {
    "recommendedRoute": "Direktverbindung / RE / ICE",
    "ticketStartingPrice": 39
  },
  "days": [
    {
      "dayNumber": 1,
      "title": "Ankunft & Erkundung",
      "activities": [
        {
          "timeSlot": "Morgen",
          "title": "...",
          "description": "...",
          "estimatedPrice": 12,
          "weatherNote": "..."
        }
      ]
    }
  ]
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API Error');
    }

    let text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    }
    throw new Error('No content in Gemini response');
  } catch (error) {
    console.error('[GEMINI API FAILURE]', error);
    return MOCK_ITINERARY;
  }
};
