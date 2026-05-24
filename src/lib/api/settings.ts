import type { Setting, Seo } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getSettings(): Promise<Setting | null> {
  try {
    const res = await fetch(`${API_URL}/api/globals/settings`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch settings')
    return (await res.json()) as Setting
  } catch (error) {
    console.error('Error fetching settings:', error)
    return null
  }
}

export async function getSeo(): Promise<Seo | null> {
  try {
    const res = await fetch(`${API_URL}/api/globals/seo`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch SEO')
    return (await res.json()) as Seo
  } catch (error) {
    console.error('Error fetching SEO:', error)
    return null
  }
}
