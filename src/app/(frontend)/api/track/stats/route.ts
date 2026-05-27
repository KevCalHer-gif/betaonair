import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/track/stats?days=30
 * Devuelve métricas agregadas de pageViews para el Dashboard.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30', 10)

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - days)
    const cutoffStr = cutoff.toISOString()

    // Fetch all pageviews in the range (with pagination)
    let allDocs: any[] = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const res = await fetch(
        `${API_URL}/api/pageviews?where[timestamp][greater_than_equal]=${encodeURIComponent(cutoffStr)}&sort=-timestamp&limit=100&page=${page}`,
      )
      if (!res.ok) break
      const data = await res.json()
      allDocs = allDocs.concat(data.docs || [])
      hasMore = data.hasNextPage || false
      page++
      if (page > 20) break // safety limit
    }

    // Aggregate: visits per day
    const visitsByDay: Record<string, number> = {}
    const visitsBySection: Record<string, number> = {}
    const visitsByPath: Record<string, number> = {}

    for (const doc of allDocs) {
      const date = new Date(doc.timestamp || doc.createdAt).toISOString().slice(0, 10)
      visitsByDay[date] = (visitsByDay[date] || 0) + 1

      const section = doc.section || 'other'
      visitsBySection[section] = (visitsBySection[section] || 0) + 1

      const path = doc.path || '/'
      visitsByPath[path] = (visitsByPath[path] || 0) + 1
    }

    // Sort and format
    const dailyVisits = Object.entries(visitsByDay)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }))

    const sectionStats = Object.entries(visitsBySection)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count }))

    const topPages = Object.entries(visitsByPath)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([path, count]) => ({ path, count }))

    const today = new Date().toISOString().slice(0, 10)
    const todayVisits = visitsByDay[today] || 0
    const totalVisits = allDocs.length

    return NextResponse.json({
      totalVisits,
      todayVisits,
      dailyVisits,
      sectionStats,
      topPages,
    })
  } catch (error) {
    console.error('Error en /api/track/stats:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
