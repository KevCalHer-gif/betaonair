import type { Category } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch categories')
    const data = await res.json()
    return data.docs as Category[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
