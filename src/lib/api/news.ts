import type { News } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getNews(): Promise<News[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/news?depth=1&where[status][equals]=published&sort=-publishedAt&limit=10`,
      { cache: 'no-store' },
    )
    if (!res.ok) throw new Error('Failed to fetch news')
    const data = await res.json()
    return data.docs as News[]
  } catch (error) {
    console.error('Error fetching news:', error)
    return []
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/news?depth=1&where[slug][equals]=${slug}`,
      { cache: 'no-store' },
    )
    if (!res.ok) throw new Error('Failed to fetch news')
    const data = await res.json()
    return (data.docs as News[])[0] || null
  } catch (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
}
