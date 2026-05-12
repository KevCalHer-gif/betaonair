'use client'

import { useEffect, useState } from 'react'
import { getLiveStreams } from '@/lib/api/live'
type Live = { id: string; title: string; embedUrl: string; isActive?: boolean }

export default function EnVivoPage() {
  const [streams, setStreams] = useState<Live[]>([])

  useEffect(() => {
    getLiveStreams().then(setStreams)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff', maxWidth: 800, margin: '0 auto' }}>
      <h1>En Vivo</h1>
      {streams.length === 0 ? (
        <p>Cargando transmisiones...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {streams.map((stream) => (
            <div key={stream.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
              {stream.titulo && <h2>{stream.titulo}</h2>}
              {stream.embedUrl && (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                  <iframe
                    src={stream.embedUrl}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
