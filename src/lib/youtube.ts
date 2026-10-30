export interface PlaylistVideo {
  id: string
  title: string
  publishedAt: string
  thumbnail: string
}

const CACHE_TTL_MS = 60 * 60 * 1000
const MAX_PAGES = 10
const cache = new Map<string, { expires: number; videos: PlaylistVideo[] }>()
const inflight = new Map<string, Promise<PlaylistVideo[]>>()

interface Thumbnails {
  maxres?: { url?: string }
  high?: { url?: string }
  medium?: { url?: string }
}

interface PlaylistItem {
  snippet?: {
    title?: string
    publishedAt?: string
    resourceId?: { videoId?: string }
    thumbnails?: Thumbnails
  }
}

interface PlaylistItemsResponse {
  items?: PlaylistItem[]
  nextPageToken?: string
}

function pickThumbnail(item: PlaylistItem, videoId: string): string {
  const t = item.snippet?.thumbnails
  const url = t?.maxres?.url || t?.high?.url || t?.medium?.url
  return url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

async function fetchPage(playlistId: string, pageToken?: string): Promise<PlaylistItemsResponse> {
  const params = new URLSearchParams({
    part: 'snippet',
    maxResults: '50',
    playlistId,
  })
  if (pageToken) params.set('pageToken', pageToken)
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
    {
      headers: { 'X-Goog-Api-Key': process.env.YOUTUBE_API_KEY || '' },
      cache: 'no-store',
    },
  )
  if (!res.ok) throw new Error(`YouTube API error ${res.status}`)
  return (await res.json()) as PlaylistItemsResponse
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
      const videos: PlaylistVideo[] = []
      let pageToken: string | undefined
      for (let page = 0; page < MAX_PAGES; page += 1) {
        const data = await fetchPage(playlistId, pageToken)
        for (const item of data.items || []) {
          const videoId = item.snippet?.resourceId?.videoId
          const title = item.snippet?.title
          if (!videoId) continue
          if (title === 'Private video' || title === 'Deleted video') continue
          videos.push({
            id: videoId,
            title: title || videoId,
            publishedAt: item.snippet?.publishedAt || '',
            thumbnail: pickThumbnail(item, videoId),
          })
        }
        if (!data.nextPageToken) break
        pageToken = data.nextPageToken
      }
      cache.set(playlistId, { expires: Date.now() + CACHE_TTL_MS, videos })
      return videos
    } catch (error) {
      console.error('Error fetching playlist videos:', error)
      return []
    } finally {
      inflight.delete(playlistId)
    }
  })()

  inflight.set(playlistId, promise)
  return promise
}
