import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import Itinerary from '../components/Itinerary'
import { tripApi } from '../services/api'
import type { Trip } from '../types'
import { useTripCache } from '../hooks/useTripCache'

export default function TripRoute() {
  const { routeSlug } = useParams<{ routeSlug: string }>()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [loading, setLoading] = useState(true)
  const { getTrip, setTrip: cacheTrip } = useTripCache()

  useEffect(() => {
    if (!routeSlug) return
    
    const cached = getTrip(routeSlug)
    if (cached) {
      setTrip(cached)
      setLoading(false)
      return
    }

    const fetchTrip = async () => {
      try {
        const { data } = await tripApi.getBySlug(routeSlug)
        setTrip(data)
        cacheTrip(routeSlug, data)
      } catch (err) {
        console.error("Failed to fetch route, using fallback", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [routeSlug])

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Lade Route...</div>
  }

  // Parse origin/destination from slug if trip is not found
  const parts = routeSlug?.split('-nach-') || []
  let origin = 'München'
  let dest = 'Salzburg'
  if (parts.length === 2) {
    origin = parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
    const destPart = parts[1].split('-')[0]
    dest = destPart.charAt(0).toUpperCase() + destPart.slice(1)
  }

  const title = trip?.seoTitle || `${origin} nach ${dest} mit dem Zug: 3-Tage-Guide | Gulliver`
  const desc = trip?.seoDescription || `Plane deinen Wochenendtrip von ${origin} nach ${dest} mit dem Zug. Inklusive Reiseplan, Tickets und Geheimtipps.`

  return (
    <>
      <SEOHead 
        title={title} 
        description={desc} 
        canonical={`/trips/${routeSlug}`}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": title,
            "description": desc
          }
        ]}
      />
      
      {/* pSEO landing page header can go here */}
      <div style={{ background: "#E8F5E9", padding: "40px 20px", textAlign: "center", marginBottom: 20 }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 32, color: "#1E3A2B", marginBottom: 12 }}>
          {title.split(' | ')[0]}
        </h1>
        <p style={{ color: "#4B5563", maxWidth: 600, margin: "0 auto" }}>{desc}</p>
      </div>

      <Itinerary trip={trip} />
    </>
  )
}
