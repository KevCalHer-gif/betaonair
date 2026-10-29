import type { Live } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getLiveStreams(): Promise<Live[]> {
  try {
    // Payload v3 no soporta where[isActive][equals]=true en checkbox.
    // Solución robusta: obtener todos y filtrar client-side.
    const res = await fetch(`${API_URL}/api/live?depth=1`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) throw new Error('Failed to fetch live streams')
    const data = await res.json()
    const all = data.docs as Live[]
    return all.filter((s) => {
      if (s.isActive !== true) return false
      const program = s.program as any
      if (typeof program === 'object' && program !== null) {
        return program.status === undefined || program.status === 'active'
      }
      return true
    })
  } catch (error) {
    console.error('Error fetching live streams:', error)
    return []
  }
}
