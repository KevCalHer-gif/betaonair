import type { Project } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch projects')
    const data = await res.json()
    return data.docs as Project[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/projects?where[slug][equals]=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch project')
    const data = await res.json()
    return (data.docs as Project[])[0] || null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}
