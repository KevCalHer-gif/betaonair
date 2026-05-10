import type { Post } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${API_URL}/api/posts`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch posts')
    const data = await res.json()
    return data.docs as Post[]
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/posts?where[slug][equals]=${slug}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch post')
    const data = await res.json()
    return (data.docs as Post[])[0] || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
}

export async function getRecentPosts(limit = 3): Promise<Post[]> {
  try {
    const res = await fetch(
      `${API_URL}/api/posts?limit=${limit}&sort=-createdAt`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) throw new Error('Failed to fetch recent posts')
    const data = await res.json()
    return data.docs as Post[]
  } catch (error) {
    console.error('Error fetching recent posts:', error)
    return []
  }
}
