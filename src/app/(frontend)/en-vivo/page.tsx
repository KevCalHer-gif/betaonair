'use client'

import { useState } from 'react'

export default function EnVivoPage() {
  const [mostrar, setMostrar] = useState(false)

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
        <p style={{
          color: '#888',
          fontSize: '1.2rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>📡</span>
          No hay transmisiones en vivo en este momento
        </p>
        {mostrar ? (
          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <iframe
              src="https://www.youtube.com/embed/myyHYsOQQJE"
              title="Beta On Air - Último video"
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
          <div
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: 8,
              aspectRatio: '16 / 9',
              maxWidth: 800,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setMostrar(true)}
              style={{
                background: '#c61d4a',
                color: '#fff',
                padding: '1rem 2rem',
                fontSize: '1.2rem',
                fontFamily: 'var(--font-brand)',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 4,
              }}
            >
              ▶ Ver transmisión
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
