import { useParams } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import DiscoveryFeed from '../components/DiscoveryFeed'

export default function ExploreHub() {
  const { budget } = useParams<{ budget: string }>()
  
  const title = `Städtetrips unter ${budget}€ | Gulliver`
  const desc = `Finde die besten Städtetrips für unter ${budget} Euro. KI-generierte Routen, günstige Bahn-Tickets und bezahlbare Unterkünfte.`

  return (
    <>
      <SEOHead 
        title={title} 
        description={desc} 
        canonical={`/explore/staedtetrips-unter-${budget}-euro`}
      />
      <div style={{ background: "#1E3A2B", padding: "60px 20px", textAlign: "center", color: "#FFF" }}>
        <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 36, marginBottom: 12 }}>
          Städtetrips unter {budget}€
        </h1>
        <p style={{ maxWidth: 600, margin: "0 auto", color: "#D1D5DB" }}>
          Entdecke preiswerte Wochenendtrips mit dem Zug. Ideal für Sparfüchse, Studenten und alle, die clever reisen wollen.
        </p>
      </div>
      <DiscoveryFeed />
    </>
  )
}
