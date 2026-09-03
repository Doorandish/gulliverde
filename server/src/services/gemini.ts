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

const MOCK_ITINERARY = {
  dayByDay: [
    {
      day: 1,
      title: "Ankunft & Altstadt",
      stops: [
        {
          time: "10:00",
          title: "Zug nach Garmisch-Partenkirchen",
          description: "Entspannte Zugfahrt von München",
          cost: 25,
          weather: "Sonnig",
          type: "transport"
        },
        {
          time: "13:00",
          title: "Mittagessen im Wirtshaus",
          description: "Bayerische Spezialitäten genießen",
          cost: 15,
          weather: "Sonnig",
          type: "food"
        }
      ]
    },
    {
      day: 2,
      title: "Zugspitze",
      stops: [
        {
          time: "09:00",
          title: "Fahrt zur Zugspitze",
          description: "Mit der Zahnradbahn auf den höchsten Berg Deutschlands",
          cost: 65,
          weather: "Klar",
          type: "activity"
        }
      ]
    }
  ]
};

export const generateItinerary = async (params: ItineraryParams) => {
  if (!env.GEMINI_API_KEY) {
    console.log('ℹ️ No GEMINI_API_KEY found, returning mock itinerary for München → Garmisch-Partenkirchen');
    return MOCK_ITINERARY;
  }

  const prompt = `Erstelle einen detaillierten Reiseplan für einen Trip von ${params.origin} nach ${params.destination}.
Dauer: ${params.duration || '2 Tage'}
Budget: ${params.budget || 'Mittel'}
Stil: ${params.style || 'Entspannt'}
Bitte antworte ausschließlich im JSON-Format mit folgendem Schema:
{
  "dayByDay": [
    {
      "day": 1,
      "title": "...",
      "stops": [
        {
          "time": "...",
          "title": "...",
          "description": "...",
          "cost": 0,
          "weather": "...",
          "type": "transport|activity|food|accommodation"
        }
      ]
    }
  ]
}`;

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`;
    
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

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error('No content in Gemini response');
  } catch (error) {
    console.error('Gemini error:', error);
    return MOCK_ITINERARY; // Fallback even on error
  }
};
