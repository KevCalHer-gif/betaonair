'use client'

import Image from 'next/image'
import React from 'react'

interface ProgramCardProps {
  nombre: string
  logo: string
  slug: string
}

export default function ProgramCard({ nombre, logo, slug }: ProgramCardProps) {
  return (
    <div
      style={{
        width: 200,
        height: 280,
        border: '1px solid #333',
        background: '#0a0a0a',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 180 }}>
        <Image
          src={logo}
          alt={nombre}
          fill
          sizes="200px"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#f0f0f0',
          fontSize: '1rem',
          textAlign: 'center',
          marginTop: '0.5rem',
          lineHeight: 1.2,
          padding: '0 0.25rem',
        }}
      >
        {nombre}
      </span>
      <button
        onClick={() => window.location.assign(`/programas/${slug}`)}
        style={{
          background: '#c61d4a',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: 4,
          marginTop: 'auto',
          marginBottom: '0.75rem',
        }}
      >
        Ver programa
      </button>
    </div>
  )
}
