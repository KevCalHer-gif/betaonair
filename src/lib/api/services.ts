/**
 * @deprecated Services collection will be removed. Use Sponsorships instead.
 */
import type { Service } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getServices(): Promise<Service[]> {
  console.warn('getServices is deprecated and will be removed.')
  return []
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  console.warn('getServiceBySlug is deprecated and will be removed.')
  return null
}
