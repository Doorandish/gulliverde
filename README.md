# 🧭 Gulliver — KI-Reiseplaner für Wochenendtrips mit dem Zug

> High-performance Progressive Web App for the German & DACH travel market. AI-powered trip planning, programmatic SEO, and affiliate monetization.

**Live**: [gulliver.doorandish.app](https://gulliver.doorandish.app)

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client (PWA)                         │
│  React 19 · Vite 8 · Tailwind CSS v4 · React Router 7  │
│  Service Worker · Offline Support · SEO Head Injection  │
└────────────────────────┬────────────────────────────────┘
                         │ /api/*
┌────────────────────────▼────────────────────────────────┐
│                    API Server                            │
│  Express 5 · TypeScript · ESM · Zod Validation          │
├─────────────┬──────────────┬───────────────┬────────────┤
│  Gemini AI  │ Weather API  │  Sitemap Gen  │ Affiliate  │
│  Itinerary  │ OpenWeather  │  XML Builder  │ Redirector │
└──────┬──────┴──────┬───────┴───────────────┴────────────┘
       │             │
┌──────▼──────┐ ┌────▼─────┐
│  MongoDB    │ │  Redis   │
│  Mongoose 8 │ │ ioredis  │
│  (optional) │ │(optional)│
└─────────────┘ └──────────┘
```

Both MongoDB and Redis are **optional** for local development — the server gracefully degrades to in-memory mock data and Map-based caching.

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9

### Setup

```bash
# Clone
git clone https://github.com/Doorandish/gulliverde.git
cd gulliverde

# Environment
cp .env.example .env

# Backend
cd server
pnpm install
pnpm dev        # → http://localhost:5000

# Frontend (new terminal)
cd front
pnpm install
pnpm dev        # → http://localhost:3000
```

The frontend dev server proxies `/api/*` requests to the backend automatically.

---

## Project Structure

```
/
├── front/                          # React + Vite + Tailwind PWA
│   ├── public/
│   │   ├── manifest.json           # PWA Manifest
│   │   ├── robots.txt              # Crawler rules + sitemap pointers
│   │   ├── sw.js                   # Service Worker
│   │   └── icons/                  # PWA Icons
│   ├── src/
│   │   ├── components/             # Nav, Footer, Hero, Cards, SEOHead
│   │   ├── hooks/                  # useSEO, useLanguage, useTripCache
│   │   ├── pages/                  # Routed Pages
│   │   ├── services/               # API client (axios)
│   │   ├── types/                  # Shared TypeScript interfaces
│   │   └── i18n/                   # de.json, en.json
│   ├── package.json
│   └── vite.config.ts
├── server/                         # Express + TypeScript API
│   ├── src/
│   │   ├── config/                 # DB, Redis, env loaders
│   │   ├── controllers/            # Request handlers
│   │   ├── middleware/             # Cache, rate-limit, validation
│   │   ├── models/                 # Mongoose schemas
│   │   ├── routes/                 # API + SEO routers
│   │   ├── services/               # Gemini, Weather, Affiliate, Sitemap
│   │   └── utils/                  # Slugify, JSON-LD generators
│   ├── package.json
│   └── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## URL Taxonomy

| Route | Purpose | Example |
|-------|---------|---------|
| `/` | Home — search, discovery | — |
| `/plan/:tripId/:slug` | AI-generated itinerary | `/plan/65f1a2b/3-tage-in-wien-nachhaltig-mit-dem-zug` |
| `/trips/:origin-nach-:dest-mit-dem-zug` | pSEO landing pages | `/trips/berlin-nach-prag-mit-dem-zug` |
| `/events/:city-:event-:year` | Seasonal events | `/events/nuernberg-christkindlesmarkt-2026` |
| `/explore/staedtetrips-unter-:budget-euro` | Budget hubs | `/explore/staedtetrips-unter-100-euro` |
| `/legal/impressum` | German Impressum | — |
| `/legal/datenschutz` | Privacy Policy (DSGVO) | — |

---

## API Endpoints

### Trips
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/trips/generate` | Generate AI itinerary |
| `GET` | `/api/trips/popular` | Popular routes (top 6) |
| `GET` | `/api/trips/:slug` | Trip by slug |
| `GET` | `/api/trips` | All trips (paginated) |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/events/upcoming` | Upcoming events |
| `GET` | `/api/events/:slug` | Event by slug |
| `GET` | `/api/events` | All events (paginated) |

### Affiliate
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/affiliate/redirect` | Tracked partner redirect |

### SEO
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/sitemap.xml` | Sitemap index |
| `GET` | `/sitemap-trips.xml` | Trip sitemap |
| `GET` | `/sitemap-events.xml` | Event sitemap |
| `GET` | `/robots.txt` | Robots file |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |

---

## Environment Variables

See [`.env.example`](.env.example) for the complete list. Key variables:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Server port |
| `MONGODB_URI` | No | — | MongoDB connection (mock data if empty) |
| `REDIS_URL` | No | — | Redis connection (in-memory if empty) |
| `GEMINI_API_KEY` | No | — | Gemini AI key (mock responses if empty) |
| `OPENWEATHER_API_KEY` | No | — | Weather API key (mock data if empty) |
| `FRONTEND_URL` | No | `https://gulliver.doorandish.app` | Canonical URL |

---

## SEO Features

- **Programmatic SEO**: Pre-built landing pages for popular train routes
- **Dynamic Meta Tags**: `<title>`, `<meta description>`, canonical, hreflang (de/en)
- **JSON-LD Schemas**: TouristTrip, Event, Organization, WebSite, SearchAction, BreadcrumbList, FAQPage
- **OpenGraph & Twitter Cards**: Dynamic social sharing metadata
- **XML Sitemaps**: Auto-generated from database content
- **robots.txt**: Proper crawler directives

---

## PWA Features

- **Offline Support**: Service worker caches shell, fonts, and images
- **Installable**: Web App Manifest with themed icons
- **Fast**: Stale-while-revalidate caching strategy
- **Train Tunnel Mode**: Offline fallback for travelers losing signal

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, TypeScript 5.7, Tailwind CSS v4 |
| Routing | React Router 7 |
| SEO | react-helmet-async, custom JSON-LD generators |
| Icons | Lucide React |
| Backend | Express 5, TypeScript, ESM |
| Database | MongoDB (Mongoose 8) |
| Cache | Redis (ioredis) / In-memory Map |
| AI | Google Gemini API |
| Weather | OpenWeatherMap API |
| PWA | Custom Service Worker |

---

## License

Proprietary — © 2026 Gulliver Travel GmbH. All rights reserved.
