import { useMemo } from 'react'
import type { SEOMetadata } from '../types'

export function useSEO(metadata: Partial<SEOMetadata>): SEOMetadata {
  return useMemo(() => {
    return {
      title: metadata.title || 'Gulliver — Dein KI-Reiseplaner',
      description: metadata.description || 'Plane deinen perfekten Wochenendtrip mit dem Zug.',
      canonical: metadata.canonical || '/',
      ogImage: metadata.ogImage,
      ogType: metadata.ogType || 'website',
      jsonLd: metadata.jsonLd,
      hreflang: metadata.hreflang,
    }
  }, [metadata])
}
