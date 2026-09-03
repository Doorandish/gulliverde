import axios from 'axios'
import type { Trip, EventData, PopularRoute } from '@/types'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
})

export const tripApi = {
  generate: (params: { origin: string; destination: string; budget?: string; style?: string; duration?: string; locale?: string }) =>
    api.post<Trip>('/trips/generate', params),
  getBySlug: (slug: string) => api.get<Trip>(`/trips/${slug}`),
  getPopular: () => api.get<PopularRoute[]>('/trips/popular'),
  list: (page = 1) => api.get<Trip[]>(`/trips?page=${page}`),
}

export const eventApi = {
  getBySlug: (slug: string) => api.get<EventData>(`/events/${slug}`),
  getUpcoming: () => api.get<EventData[]>('/events/upcoming'),
  list: (page = 1) => api.get<EventData[]>(`/events?page=${page}`),
}

export const getAffiliateUrl = (provider: string, dest: string) =>
  `/api/affiliate/redirect?provider=${encodeURIComponent(provider)}&dest=${encodeURIComponent(dest)}`

export default api
