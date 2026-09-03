import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import Itinerary from '../components/Itinerary'
import { tripApi } from '../services/api'
import type { Trip } from '../types'
import { useTripCache } from '../hooks/useTripCache'

export default function PlanView() {
  const { slug } = useParams<{ tripId: string, slug: string }>()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [loading, setLoading] = useState(true)
  const { getTrip, setTrip: cacheTrip } = useTripCache()

  useEffect(() => {
    if (!slug) return
    
    const cached = getTrip(slug)
    if (cached) {
      setTrip(cached)
      setLoading(false)
      return
    }

    const fetchTrip = async () => {
      try {
        const { data } = await tripApi.getBySlug(slug)
        setTrip(data)
        cacheTrip(slug, data)
      } catch (err) {
        console.error("Failed to fetch trip, using fallback", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [slug])

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Lade Reiseplan...</div>
  }

  const seoTitle = trip?.seoTitle || "Dein Wochenendtrip | Gulliver"
  const seoDesc = trip?.seoDescription || "Lass dich von unserem KI-Planer für deinen nächsten Wochenendtrip inspirieren."
  
  return (
    <>
      <SEOHead 
        title={seoTitle} 
        description={seoDesc} 
        canonical={`/plan/${trip?._id || 'new'}/${slug}`}
        jsonLd={trip ? [
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "name": trip.seoTitle,
            "description": trip.seoDescription,
            "itinerary": {
              "@type": "ItemList",
              "itemListElement": trip.dayByDay.map((d, i) => ({
                "@type": "ListItem",
                "position": i + 1,
                "item": {
                  "@type": "TouristAttraction",
                  "name": `Tag ${d.day}: ${d.title}`
                }
              }))
            }
          }
        ] : undefined}
      />
      <Itinerary trip={trip} />
    </>
  )
}
