import type { MetadataRoute } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  // Rutas estáticas
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/programas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/en-vivo`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: `${siteUrl}/noticias`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/patrocinios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${siteUrl}/servicios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/portafolio`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Rutas dinámicas desde Payload
  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const collections = ['programs', 'news', 'services'] as const

    for (const collection of collections) {
      try {
        const res = await fetch(
          `${API_URL}/api/${collection}?limit=100&depth=0&select[slug]=true&select[updatedAt]=true`,
          { next: { revalidate: 3600 } }
        )
        if (!res.ok) continue

        const data = await res.json()
        const docs = data.docs || []

        for (const doc of docs) {
          if (!doc.slug) continue

          const prefix =
            collection === 'programs'
              ? '/programas/'
              : collection === 'news'
                ? '/noticias/'
                : '/servicios/'

          dynamicRoutes.push({
            url: `${siteUrl}${prefix}${doc.slug}`,
            lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })
        }
      } catch {
        // Ignorar colección si falla, no romper el sitemap
      }
    }
  } catch {
    // Si toda la API falla, al menos servimos las rutas estáticas
  }

  return [...staticRoutes, ...dynamicRoutes]
}