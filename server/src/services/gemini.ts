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
          },
          {
            timeSlot: "Nachmittag",
            title: "Kultureller Rundgang & Schloss/Museumsbesuch",
            description: "Besichtigung der wichtigsten Sehenswürdigkeiten der Stadt.",
            estimatedPrice: 15,
            weatherNote: "Überdacht"
          },
          {
            timeSlot: "Abend",
            title: "Fränkisches/Regionales Abendessen & Ausklang",
            description: "Typische Spezialitäten in einer traditionellen Gaststätte genießen.",
            estimatedPrice: 28,
            weatherNote: "Gemütliche Atmosphäre"
          }
        ]
      },
      {
        dayNumber: 2,
        title: "Natur, Aussicht & Abreise",
        activities: [
          {
            timeSlot: "Morgen",
            title: "Frühstück & Parkspaziergang",
            description: "Entspannter Start in den Tag im Hofgarten oder Stadtpark.",
            estimatedPrice: 10,
            weatherNote: "Frische Morgenluft"
          },
          {
            timeSlot: "Nachmittag",
            title: "Lokales Handwerk & Souvenirs vor der Rückfahrt",
            description: "Letzte Entdeckungen und entspannte Bahnrückreise.",
            estimatedPrice: 15,
            weatherNote: "Trocken"
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
Generate a comprehensive 2-day weekend itinerary for the destination "${destination}".
Return ONLY a valid raw JSON object (without markdown blocks) matching this format:
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
      "title": "Ankunft & Altstadt-Erkundung",
      "activities": [
        {
          "timeSlot": "Morgen",
          "title": "Ankunft am Hauptbahnhof & Kaffee in der Altstadt",
          "description": "Bummel durch die historischen Gassen und regionaler Frühstücksstopp.",
          "estimatedPrice": 12,
          "weatherNote": "Ideal bei jedem Wetter"
        },
        {
          "timeSlot": "Nachmittag",
          "title": "Kultureller Rundgang & Schloss/Museumsbesuch",
          "description": "Besichtigung der wichtigsten Sehenswürdigkeiten der Stadt.",
          "estimatedPrice": 15,
          "weatherNote": "Überdacht"
        },
        {
          "timeSlot": "Abend",
          "title": "Fränkisches/Regionales Abendessen & Ausklang",
          "description": "Typische Spezialitäten in einer traditionellen Gaststätte genießen.",
          "estimatedPrice": 28,
          "weatherNote": "Gemütliche Atmosphäre"
        }
      ]
    },
    {
      "dayNumber": 2,
      "title": "Natur, Aussicht & Abreise",
      "activities": [
        {
          "timeSlot": "Morgen",
          "title": "Frühstück & Parkspaziergang",
          "description": "Entspannter Start in den Tag im Hofgarten oder Stadtpark.",
          "estimatedPrice": 10,
          "weatherNote": "Frische Morgenluft"
        },
        {
          "timeSlot": "Nachmittag",
          "title": "Lokales Handwerk & Souvenirs vor der Rückfahrt",
          "description": "Letzte Entdeckungen und entspannte Bahnrückreise.",
          "estimatedPrice": 15,
          "weatherNote": "Trocken"
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
      // Clean up markdown wrappers if Gemini returned them
      text = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      return JSON.parse(text);
    }
    throw new Error('No content in Gemini response');
  } catch (error) {
    console.error('[Gemini Error]:', error);
    return MOCK_ITINERARY; // Fallback even on error
  }
};
