import type { Trip } from '../types'

export function useTripCache() {
  const getTrip = (slug: string): Trip | null => {
    try {
      const cached = sessionStorage.getItem(`trip_${slug}`)
      if (cached) {
        return JSON.parse(cached) as Trip
      }
    } catch (e) {
      console.error('Failed to parse trip from cache', e)
    }
    return null
  }

  const setTrip = (slug: string, trip: Trip) => {
    try {
      sessionStorage.setItem(`trip_${slug}`, JSON.stringify(trip))
    } catch (e) {
      console.error('Failed to set trip to cache', e)
    }
  }

  return { getTrip, setTrip }
}
