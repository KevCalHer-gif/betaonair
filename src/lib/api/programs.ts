import type { Program } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API_URL}/api/programs`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch programs')
    const data = await res.json()
    return data.docs as Program[]
  } catch (error) {
    console.error('Error fetching programs:', error)
    return []
  }
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/programs?where[slug][equals]=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch program')
    const data = await res.json()
    return (data.docs as Program[])[0] || null
  } catch (error) {
    console.error('Error fetching program by slug:', error)
    return null
  }
}
