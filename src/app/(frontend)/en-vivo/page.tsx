'use client'

import { useEffect, useState } from 'react'
import { getLiveStreams } from '../../../lib/api/live'

interface LiveStream {
  id: number
  embedUrl?: string | null
  isActive?: boolean | null
}

export default function EnVivoPage() {
  const [stream, setStream] = useState<LiveStream | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const streams = await getLiveStreams()
        const active = streams.find((s: any) => s.isActive === true)
        setStream(active || null)
      } catch (error) {
        console.error('Error fetching live streams:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        En Vivo
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>
        {loading ? (
          <p style={{ color: '#888', fontSize: '1.2rem' }}>Cargando transmisión…</p>
        ) : stream && stream.embedUrl ? (
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <iframe
              src={stream.embedUrl}
              title="Transmisión en vivo"
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                border: 'none',
                display: 'block',
              }}
              allowFullScreen
            />
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 8,
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '1.2rem',
                textAlign: 'center',
                padding: '2rem',
              }}
            >
              <span>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📡</span>
                No hay transmisión en vivo en este momento
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
