import config from '@payload-config'
import { getPayload } from 'payload'

interface PageViewRecord {
  id: string
  path: string
  section?: string | null
  contentType?: string | null
  contentSlug?: string | null
  contentTitle?: string | null
  sessionId?: string | null
  device?: string | null
  country?: string | null
  referrer?: string | null
  duration?: number | null
  timestamp: string
  createdAt: string
}

/** Helper: obtiene todos los pageviews de los últimos N días usando Payload local API */
async function fetchAllPageViews(days: number): Promise<PageViewRecord[]> {
  const payload = await getPayload({ config })
  const since = new Date()
  since.setDate(since.getDate() - days)

  const result = await payload.find({
    collection: 'pageviews',
    where: {
      timestamp: {
        greater_than: since.toISOString(),
      },
    },
    limit: 10000,
    sort: '-timestamp',
  })

  return result.docs as unknown as PageViewRecord[]
}

/** Total de vistas de los últimos N días */
export async function getTotalViews(days: number): Promise<number> {
  try {
    const views = await fetchAllPageViews(days)
    return views.length
  } catch {
    return 0
  }
}

/** Sesiones únicas de los últimos N días */
export async function getUniqueSessions(days: number): Promise<number> {
  try {
    const views = await fetchAllPageViews(days)
    const sessions = new Set(views.map((v) => v.sessionId).filter(Boolean))
    return sessions.size
  } catch {
    return 0
  }
}

/** Tasa de rebote estimada (visitas con duration < 10s / total) */
export async function getBounceRate(days: number): Promise<number> {
  try {
    const views = await fetchAllPageViews(days)
    const withDuration = views.filter((v) => v.duration != null)
    if (withDuration.length === 0) return 0
    const bounced = withDuration.filter((v) => (v.duration ?? 0) < 10).length
    return Math.round((bounced / withDuration.length) * 100)
  } catch {
    return 0
  }
}

/** Top N contenidos agrupados por contentSlug */
export async function getTopContent(
  limit: number,
  days: number,
): Promise<{ title: string; slug: string; contentType: string; views: number }[]> {
  try {
    const views = await fetchAllPageViews(days)
    const map = new Map<string, { title: string; slug: string; contentType: string; views: number }>()

    for (const v of views) {
      const key = v.contentSlug || v.path
      if (!key || key === '/') continue
      const existing = map.get(key)
      if (existing) {
        existing.views++
      } else {
        map.set(key, {
          title: v.contentTitle || v.path || key,
          slug: v.contentSlug || key,
          contentType: v.contentType || 'otro',
          views: 1,
        })
      }
    }

    return Array.from(map.values())
      .sort((a, b) => b.views - a.views)
      .slice(0, limit)
  } catch {
    return []
  }
}

/** Distribución por tipo de contenido */
export async function getViewsByType(days: number): Promise<{ type: string; views: number }[]> {
  try {
    const views = await fetchAllPageViews(days)
    const map = new Map<string, number>()

    for (const v of views) {
      const type = v.contentType || 'otro'
      map.set(type, (map.get(type) || 0) + 1)
    }

    return Array.from(map.entries())
      .map(([type, views]) => ({ type, views }))
      .sort((a, b) => b.views - a.views)
  } catch {
    return []
  }
}

/** Distribución por dispositivo */
export async function getViewsByDevice(days: number): Promise<{ device: string; views: number }[]> {
  try {
    const views = await fetchAllPageViews(days)
    const map = new Map<string, number>()

    for (const v of views) {
      const device = v.device || 'desktop'
      map.set(device, (map.get(device) || 0) + 1)
    }

    return Array.from(map.entries())
      .map(([device, views]) => ({ device, views }))
      .sort((a, b) => b.views - a.views)
  } catch {
    return []
  }
}

/** Vistas agrupadas por día para gráfico de línea */
export async function getViewsTimeline(days: number): Promise<{ date: string; views: number }[]> {
  try {
    const views = await fetchAllPageViews(days)
    const map = new Map<string, number>()

    for (const v of views) {
      const date = v.timestamp ? v.timestamp.substring(0, 10) : v.createdAt.substring(0, 10)
      map.set(date, (map.get(date) || 0) + 1)
    }

    return Array.from(map.entries())
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch {
    return []
  }
}

/** Top secciones por vistas */
export async function getTopSections(days: number): Promise<{ path: string; views: number }[]> {
  try {
    const views = await fetchAllPageViews(days)
    const map = new Map<string, number>()

    for (const v of views) {
      const section = v.path === '/' ? '/' : '/' + (v.path.split('/')[1] || '')
      map.set(section, (map.get(section) || 0) + 1)
    }

    return Array.from(map.entries())
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
  } catch {
    return []
  }
}