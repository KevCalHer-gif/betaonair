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
    // Payload REST API where clause para relaciones es inconsistente en v3.
    // Solución robusta: obtener todos los episodios y filtrar por program.slug.
    const res = await fetch(`${API_URL}/api/episodes?depth=2`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch episodes')
    const data = await res.json()
    const episodes = data.docs as Episode[]
    // Filtrar por el slug del programa relacionado
    return episodes.filter((ep) => {
      const program = ep.program as { slug?: string } | number
      if (typeof program === 'object' && program !== null) {
        return program.slug === slug
      }
      return false
    })
  } catch (error) {
    console.error('Error fetching episodes by program:', error)
    return []
  }
}
