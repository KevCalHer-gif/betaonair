import type { Sponsorship } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/**
 * Obtiene todos los patrocinadores activos.
 */
export async function getSponsorships(): Promise<Sponsorship[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/sponsorships?where[status][equals]=active&limit=50&depth=1`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch sponsorships')
    const data = await res.json()
    return data.docs as Sponsorship[]
  } catch (error) {
    console.error('Error fetching sponsorships:', error)
    return []
  }
}
