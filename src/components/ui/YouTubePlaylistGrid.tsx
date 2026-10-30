'use client'

import { useState } from 'react'
import type { PlaylistVideo } from '@/lib/youtube'

interface YouTubePlaylistGridProps {
  videos: PlaylistVideo[]
}

export default function YouTubePlaylistGrid({ videos }: YouTubePlaylistGridProps) {
  const [activeVideo, setActiveVideo] = useState<PlaylistVideo | null>(null)

  return (
    <div>
      {activeVideo && (
        <div
          style={{
            width: '100%',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid #333',
            marginBottom: '1.5rem',
            background: '#000',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
            title={activeVideo.title}
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              border: 'none',
              display: 'block',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem',
        }}
      >
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActiveVideo(video)}
            style={{
              background: '#111',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: 0,
              overflow: 'hidden',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'inherit',
              font: 'inherit',
              transition: 'border-color 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c61d4a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#333'
              e.currentTarget.style.transform = 'none'
            }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', background: '#0a0a0a' }}>
              <img
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
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
                  transition: 'background 0.2s ease',
                }}
              >
                <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.65)" stroke="#c61d4a" strokeWidth="2" />
                  <path d="M20 16l14 8-14 8z" fill="#c61d4a" />
                </svg>
              </div>
            </div>
            <div style={{ padding: '0.75rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  color: '#f0f0f0',
                  fontSize: '0.95rem',
                  margin: '0 0 0.4rem',
                  lineHeight: 1.4,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {video.title}
              </h3>
              {video.publishedAt && (
                <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>
                  {new Date(video.publishedAt).toLocaleDateString('es-BO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
