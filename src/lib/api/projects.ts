import type { Project } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

/**
 * Obtiene todos los proyectos publicados, ordenados por `order`.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/projects?where[status][equals]=published&sort=order&limit=50&depth=1`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error('Failed to fetch projects')
    const data = await res.json()
    return data.docs as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

/**
 * Obtiene proyectos filtrados por el slug del servicio relacionado.
 * Usa fetch-all + client-side filter por compatibilidad con Payload v3.
 */
export async function getProjectsByService(serviceSlug: string): Promise<Project[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/projects?where[status][equals]=published&sort=order&limit=50&depth=3`,
      { next: { revalidate: 60 } },
    )
    if (!res.ok) throw new Error('Failed to fetch projects by service')
    const data = await res.json()
    const projects = data.docs as Project[]
    return projects.filter((proj) => {
      const svc = proj.service as { slug?: string } | null | undefined
      if (typeof svc === 'object' && svc !== null && svc.slug) {
        return svc.slug === serviceSlug
      }
      return false
    })
  } catch (error) {
    console.error('Error fetching projects by service:', error)
    return []
  }
}
