import { XMLParser } from 'fast-xml-parser'

export interface PlaylistVideo {
  id: string
  title: string
  publishedAt: string
  thumbnail: string
}

const CACHE_TTL_MS = 60 * 60 * 1000
const cache = new Map<string, { expires: number; videos: PlaylistVideo[] }>()
const inflight = new Map<string, Promise<PlaylistVideo[]>>()

interface FeedEntry {
  'yt:videoId'?: string
  title?: string
  published?: string
  'media:group'?: {
    'media:thumbnail'?: { '@_url'?: string; '@_width'?: number } | { '@_url'?: string; '@_width'?: number }[]
  }
}

function pickThumbnail(group: FeedEntry['media:group'], videoId: string): string {
  const thumbs = group?.['media:thumbnail']
  if (!thumbs) return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  const list = Array.isArray(thumbs) ? thumbs : [thumbs]
  let best = ''
  let bestWidth = 0
  for (const t of list) {
    const width = Number(t['@_width'] || 0)
    if (t['@_url'] && width > bestWidth) {
      best = t['@_url']
      bestWidth = width
    }
  }
  return best || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

function parseFeed(xml: string): PlaylistVideo[] {
  const parser = new XMLParser({ ignoreAttributes: false })
  const doc = parser.parse(xml)
  const rawEntries = doc?.feed?.entry
  if (!rawEntries) return []
  const entries = Array.isArray(rawEntries) ? rawEntries : [rawEntries]
  const videos: PlaylistVideo[] = []
  for (const entry of entries as FeedEntry[]) {
    const id = entry['yt:videoId']
    if (!id) continue
    videos.push({
      id,
      title: entry.title || id,
      publishedAt: entry.published || '',
      thumbnail: pickThumbnail(entry['media:group'], id),
    })
  }
  videos.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
  return videos
}

export async function getPlaylistVideos(playlistId: string): Promise<PlaylistVideo[]> {
  if (!playlistId) return []

  const cached = cache.get(playlistId)
  if (cached && cached.expires > Date.now()) return cached.videos
  if (cached) cache.delete(playlistId)

  const existing = inflight.get(playlistId)
  if (existing) return existing

  const promise = (async () => {
    try {
      const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`, {
        cache: 'no-store',
      })
      if (!res.ok) return []
      const xml = await res.text()
      const videos = parseFeed(xml)
      cache.set(playlistId, { expires: Date.now() + CACHE_TTL_MS, videos })
      return videos
    } catch {
      return []
    } finally {
      inflight.delete(playlistId)
    }
  })()

  inflight.set(playlistId, promise)
  return promise
}
