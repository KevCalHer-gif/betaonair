import type { Testimonial } from '../../payload-types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_URL}/api/testimonials`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch testimonials')
    const data = await res.json()
    return data.docs as Testimonial[]
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}
