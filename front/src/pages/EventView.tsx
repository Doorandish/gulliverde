import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SEOHead from '../components/SEOHead'
import EventDetail from '../components/EventDetail'
import { eventApi } from '../services/api'
import type { EventData } from '../types'

export default function EventView() {
  const { eventSlug } = useParams<{ eventSlug: string }>()
  const [event, setEvent] = useState<EventData | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!eventSlug) return
    
    const fetchEvent = async () => {
      try {
        const { data } = await eventApi.getBySlug(eventSlug)
        setEvent(data)
      } catch (err) {
        console.error("Failed to fetch event, using fallback", err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventSlug])

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Lade Event...</div>
  }

  const title = event?.seoTitle || "Event Guide | Gulliver"
  const desc = event?.seoDescription || "Entdecke tolle Events für deinen nächsten Wochenendtrip."

  return (
    <>
      <SEOHead 
        title={title} 
        description={desc} 
        canonical={`/events/${eventSlug}`}
        jsonLd={event ? [
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": event.title,
            "description": event.description,
            "startDate": event.startDate,
            "endDate": event.endDate,
            "location": {
              "@type": "Place",
              "name": event.city
            }
          }
        ] : undefined}
      />
      <EventDetail event={event} />
    </>
  )
}
