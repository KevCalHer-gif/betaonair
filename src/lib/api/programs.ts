import type { Program } from '../../payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getPrograms(): Promise<Program[]> {
  try {
    const res = await fetch(`${API_URL}/api/programs?depth=2&limit=50`, {
      next: { revalidate: 60 },
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
    // Usar Payload Local API en vez de REST para garantizar que backgroundImage se popule
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'programs',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
    })
    return (result.docs as Program[])[0] || null
  } catch (error) {
    console.error('Error fetching program by slug:', error)
    return null
  }
}
