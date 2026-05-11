/**
 * @deprecated Projects collection will be removed. Use programs instead.
 */
import type { Project } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getProjects(): Promise<Project[]> {
  console.warn('getProjects is deprecated and will be removed.')
  return []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  console.warn('getProjectBySlug is deprecated and will be removed.')
  return null
}
