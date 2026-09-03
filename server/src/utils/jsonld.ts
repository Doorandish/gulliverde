const BASE_URL = 'https://gulliver.doorandish.app';

export const buildOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Gulliver",
  "url": BASE_URL,
  "logo": `${BASE_URL}/logo.png`,
});

export const buildTouristTripSchema = (trip: any) => ({
  "@context": "https://schema.org",
  "@type": "TouristTrip",
  "name": trip.seoTitle || `Zugreise von ${trip.origin} nach ${trip.destination}`,
  "description": trip.seoDescription,
  "itinerary": trip.dayByDay?.map((day: any) => ({
    "@type": "ItemList",
    "name": `Tag ${day.day}: ${day.title}`,
    "itemListElement": day.stops?.map((stop: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TouristAttraction",
        "name": stop.title,
        "description": stop.description
      }
    }))
  }))
});

export const buildBreadcrumbSchema = (items: {name: string, url: string}[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${BASE_URL}${item.url}`
  }))
});

export const buildFAQSchema = (pairs: {question: string, answer: string}[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": pairs.map(p => ({
    "@type": "Question",
    "name": p.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": p.answer
    }
  }))
});

export const buildEventSchema = (event: any) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "description": event.description,
  "location": {
    "@type": "Place",
    "name": event.city
  }
});
