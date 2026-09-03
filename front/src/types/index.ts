export interface DayStop {
  time: string
  title: string
  description: string
  cost: number
  weather: string
  type: 'transport' | 'activity' | 'food' | 'accommodation'
  ctaLabel?: string
  ctaUrl?: string
  ctaColor?: string
}

export interface DayPlan {
  day: number
  title: string
  date?: string
  stops: DayStop[]
}

export interface Trip {
  _id: string
  origin: string
  destination: string
  slug: string
  duration: string
  trainLines: string[]
  estimatedCost: number
  dayByDay: DayPlan[]
  seoTitle: string
  seoDescription: string
  locale: 'de' | 'en'
  faqPairs: { question: string; answer: string }[]
  imageUrl?: string
  trainDuration?: string
}

export interface EventData {
  _id: string
  title: string
  slug: string
  city: string
  coordinates: { lat: number; lng: number }
  startDate: string
  endDate: string
  description: string
  trainDistanceFromHbf: string
  budgetPriceTable: { item: string; price: number }[]
  category: string
  imageUrl: string
  seoTitle: string
  seoDescription: string
}

export interface PopularRoute {
  _id: string
  title: string
  origin: string
  destination: string
  slug: string
  trainDuration: string
  price: number
  imageUrl: string
  category: string
}

export interface SEOMetadata {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: Record<string, unknown>[]
  hreflang?: { lang: string; href: string }[]
}

export type AffiliateProvider = 'omio' | 'db' | 'booking' | 'gyg'
