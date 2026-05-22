import type { Service } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/**
 * Obtiene todos los servicios activos ordenados por el campo `order`.
 * Solo devuelve servicios con `isActive: true`.
 */
export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/services?where[isActive][equals]=true&sort=order&limit=50`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error('Failed to fetch services')
    const data = await res.json()
    return data.docs as Service[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

/**
 * Obtiene un servicio individual por su slug.
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/services?where[slug][equals]=${slug}&depth=1`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error('Failed to fetch service')
    const data = await res.json()
    return (data.docs as Service[])[0] || null
  } catch (error) {
    console.error('Error fetching service by slug:', error)
    return null
  }
}
