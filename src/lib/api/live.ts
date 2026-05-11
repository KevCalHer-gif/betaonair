import type { Live } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getLiveStreams(): Promise<Live[]> {
  try {
    const res = await fetch(`${API_URL}/api/live`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch live streams')
    const data = await res.json()
    return data.docs as Live[]
  } catch (error) {
    console.error('Error fetching live streams:', error)
    return []
  }
}
