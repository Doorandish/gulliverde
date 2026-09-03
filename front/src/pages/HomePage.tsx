import SEOHead from '../components/SEOHead'
import Hero from '../components/Hero'
import DiscoveryFeed from '../components/DiscoveryFeed'
import { useSEO } from '../hooks/useSEO'

export default function HomePage() {
  const seo = useSEO({
    title: "Gulliver — Dein KI-Reiseplaner für Wochenendtrips mit dem Zug",
    description: "Plane deinen perfekten Wochenendtrip mit dem Zug. KI-gestützte Reiseplanung für Deutschland, Österreich und die Schweiz.",
    canonical: "/",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://gulliver.doorandish.app/",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://gulliver.doorandish.app/plan/new/{search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Gulliver",
        "url": "https://gulliver.doorandish.app",
        "logo": "https://gulliver.doorandish.app/icons/icon-512.png"
      }
    ]
  })

  return (
    <>
      <SEOHead {...seo} />
      <main>
        <Hero />
        <DiscoveryFeed />
      </main>
    </>
  )
}
