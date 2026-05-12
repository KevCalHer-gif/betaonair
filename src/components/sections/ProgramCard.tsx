'use client'

import React from 'react'

interface ProgramCardProps {
  title: string
  embedUrl: string
  moreLink: string
}

export default function ProgramCard({ title, embedUrl, moreLink }: ProgramCardProps) {
  return (
    <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem', maxWidth: 400, margin: '0 auto' }}>
      <h3 style={{ color: '#c61d4a', fontSize: '1.2rem', marginBottom: '1rem' }}>{title}</h3>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
        <iframe
          src={embedUrl}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <a href={moreLink} style={{ color: '#c61d4a', textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>
        Ver más episodios →
      </a>
    </div>
  )
}
