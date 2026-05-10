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
    console.error('Error fetching project by slug:', error)
    return null
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/projects?where[destacado][equals]=true`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch featured projects')
    const data = await res.json()
    return data.docs as Project[]
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }
}
