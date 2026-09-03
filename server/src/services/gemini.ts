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

export async function generateTripPlan(destination: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[Gemini] ERROR: GEMINI_API_KEY is not defined in environment variables.");
    throw new Error("Missing GEMINI_API_KEY");
  }

  const prompt = `Du bist ein präziser deutscher Reiseexperte für Städtetrips mit der Bahn.
Erstelle einen detaillierten 2-Tage-Reiseplan für "${destination}".
Berücksichtige echte, berühmte Orte und Sehenswürdigkeiten in "${destination}".
Alle Preise müssen positive Zahlen sein (z.B. 15, nicht -15).

Gib das Ergebnis AUSSCHLIESSLICH als valides JSON-Objekt ohne Markdown-Codeblöcke (kein \`\`\`json) mit genau dieser Struktur zurück:
{
  "destination": "${destination}",
  "durationDays": 2,
  "totalBudget": 145,
  "co2SavedPercent": 75,
  "days": [
    {
      "dayNumber": 1,
      "title": "Tag 1: Highlights & Kultur",
      "activities": [
        {
          "timeSlot": "Morgen",
          "title": "Konkrete Sehenswürdigkeit in ${destination}",
          "description": "Detaillierte Beschreibung...",
          "estimatedPrice": 12,
          "weatherNote": "Überdacht / Draußen"
        },
        {
          "timeSlot": "Nachmittag",
          "title": "Zweite konkrete Attraktion",
          "description": "Detaillierte Beschreibung...",
          "estimatedPrice": 18,
          "weatherNote": "Trocken"
        },
        {
          "timeSlot": "Abend",
          "title": "Abendessen & Nachtleben in ${destination}",
          "description": "Empfehlung für Viertel oder Restaurant...",
          "estimatedPrice": 25,
          "weatherNote": "Gemütlich"
        }
      ]
    },
    {
      "dayNumber": 2,
      "title": "Tag 2: Panorama, Natur & Abreise",
      "activities": [
        {
          "timeSlot": "Morgen",
          "title": "Frühstück & Spaziergang an bekanntem Ort",
          "description": "Beschreibung...",
          "estimatedPrice": 10,
          "weatherNote": "Frisch"
        },
        {
          "timeSlot": "Nachmittag",
          "title": "Abschluss-Erkundung vor der Bahnrückfahrt",
          "description": "Beschreibung...",
          "estimatedPrice": 15,
          "weatherNote": "Flexibel"
        }
      ]
    }
  ]
}`;

  console.log(`[Gemini] Calling Gemini API for: ${destination}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    console.error(`[Gemini API Error] Status: ${response.status} - ${errText}`);
    throw new Error(`Gemini API failed with status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Empty response from Gemini API");
  }

  // Sanitize any markdown wrappers if returned
  const cleanedJson = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanedJson);

  // Guarantee positive numbers for prices
  parsed.totalBudget = Math.abs(parsed.totalBudget || 140);
  if (parsed.days) {
    parsed.days.forEach((d: any) => {
      d.activities?.forEach((a: any) => {
        a.estimatedPrice = Math.abs(a.estimatedPrice || 0);
      });
    });
  }

  return parsed;
}
