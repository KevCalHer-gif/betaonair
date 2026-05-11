import type { Episode } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getEpisodes(): Promise<Episode[]> {
  try {
    const res = await fetch(`${API_URL}/api/episodes`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch episodes')
    const data = await res.json()
    return data.docs as Episode[]
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return []
  }
}

export async function getEpisodesByProgram(slug: string): Promise<Episode[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/episodes?where[program.slug][equals]=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch episodes by program')
    const data = await res.json()
    return data.docs as Episode[]
  } catch (error) {
    console.error('Error fetching episodes by program:', error)
    return []
  }
}
