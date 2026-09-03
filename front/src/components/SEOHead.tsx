import { useEffect } from 'react'
import type { SEOMetadata } from '../types'

export default function SEOHead({ title, description, canonical, ogImage, ogType = 'website', jsonLd, hreflang }: SEOMetadata) {
  const baseUrl = 'https://gulliver.doorandish.app'
  const url = `${baseUrl}${canonical}`
  const image = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}/og-image.jpg`

  useEffect(() => {
    // Title
    document.title = title

    // Helper to set/create meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', ogType)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonicalEl) {
      canonicalEl = document.createElement('link')
      canonicalEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalEl)
    }
    canonicalEl.setAttribute('href', url)

    // Hreflang
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())
    hreflang?.forEach((hl) => {
      const link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', hl.lang)
      link.setAttribute('href', `${baseUrl}${hl.href}`)
      document.head.appendChild(link)
    })

    // JSON-LD
    document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove())
    jsonLd?.forEach((schema) => {
      const script = document.createElement('script')
      script.setAttribute('type', 'application/ld+json')
      script.setAttribute('data-seo-jsonld', 'true')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })

    return () => {
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove())
      document.querySelectorAll('script[data-seo-jsonld]').forEach(el => el.remove())
    }
  }, [title, description, url, image, ogType, jsonLd, hreflang])

  return null
}
