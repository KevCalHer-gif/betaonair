'use client'

import { useState } from 'react'

interface EpisodeCardProps {
  title: string
  publishedAt?: string | null
  embedUrl?: string | null
  thumbnailUrl?: string | null
}

export default function EpisodeCard({ title, publishedAt, embedUrl, thumbnailUrl }: EpisodeCardProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div style={{
      border: '1px solid #333',
      borderRadius: '8px',
      padding: '1.5rem',
      background: '#111',
    }}>
      <h3 style={{
        color: '#f0f0f0',
        fontSize: '1.1rem',
        marginBottom: '0.75rem',
      }}>
        {title}
      </h3>
      {publishedAt && (
        <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {new Date(publishedAt).toLocaleDateString('es-BO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}
      {embedUrl ? (
        thumbnailUrl && !playing ? (
          <div
            role="button"
            tabIndex={0}
            aria-label={`Reproducir ${title}`}
            onClick={() => setPlaying(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setPlaying(true)
              }
            }}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#0a0a0a',
              cursor: 'pointer',
            }}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.25)',
              }}
            >
              <svg width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
                <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.65)" stroke="#c61d4a" strokeWidth="2" />
                <path d="M20 16l14 8-14 8z" fill="#c61d4a" />
              </svg>
            </div>
          </div>
        ) : (
          <div style={{
            width: '100%',
            borderRadius: '6px',
            overflow: 'hidden',
          }}>
            <iframe
              src={embedUrl}
              title={title}
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
                border: 'none',
                display: 'block',
              }}
              allowFullScreen
            />
          </div>
        )
      ) : (
        <p style={{ color: '#555', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Video no disponible aún.
        </p>
      )}
    </div>
  )
}
