import { NextResponse } from 'next/server'
import {
  getTotalViews,
  getUniqueSessions,
  getBounceRate,
  getTopContent,
  getViewsByType,
  getViewsByDevice,
  getViewsTimeline,
  getTopSections,
} from '../../../lib/api/pageviews'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function GET() {
  try {
    const DAYS = 30
    const TOP_LIMIT = 10

    const [
      totalViews,
      uniqueSessions,
      bounceRate,
      topContent,
      viewsByType,
      viewsByDevice,
      timeline,
      topSections,
    ] = await Promise.all([
      getTotalViews(DAYS),
      getUniqueSessions(DAYS),
      getBounceRate(DAYS),
      getTopContent(TOP_LIMIT, DAYS),
      getViewsByType(DAYS),
      getViewsByDevice(DAYS),
      getViewsTimeline(DAYS),
      getTopSections(DAYS),
    ])

    // Contar sponsors activos
    let activeSponsors = 0
    try {
      const res = await fetch(
        `${API_URL}/api/sponsorships?where[status][equals]=active&limit=1`,
        { cache: 'no-store' },
      )
      if (res.ok) {
        const data = await res.json()
        activeSponsors = data.totalDocs || 0
      }
    } catch {
      // Silencioso
    }

    const mostViewedTitle = topContent.length > 0 ? topContent[0].title : 'Sin datos aún'

    return NextResponse.json({
      totalViews,
      uniqueSessions,
      bounceRate,
      topContent,
      viewsByType,
      viewsByDevice,
      timeline,
      topSections,
      activeSponsors,
      mostViewedTitle,
    })
  } catch (error) {
    console.error('Error fetching analytics summary:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}