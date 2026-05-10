import type { Service } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${API_URL}/api/services`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch services')
    const data = await res.json()
    return data.docs as Service[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/services?where[slug][equals]=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch service')
    const data = await res.json()
    return (data.docs as Service[])[0] || null
  } catch (error) {
    console.error('Error fetching service by slug:', error)
    return null
  }
}
