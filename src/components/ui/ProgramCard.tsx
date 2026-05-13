'use client'

import Image from 'next/image'
import Link from 'next/link'
import '@/app/(frontend)/animations.css'

interface ProgramCardProps {
  nombre: string
  logo: string
  slug: string
  descripcion: string
}

export default function ProgramCard({ nombre, logo, slug, descripcion }: ProgramCardProps) {
  return (
    <article
      className="card-programa fade-in-up"
      style={{
        background: '#0a0a0a',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '1.5rem',
        width: '220px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src={logo}
        alt={nombre}
        width={200}
        height={200}
        style={{ objectFit: 'contain' }}
      />
      <h2
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#f0f0f0',
          fontSize: '1.2rem',
          textAlign: 'center',
          marginTop: '1rem',
        }}
      >
        {nombre}
      </h2>
      <p
        style={{
          color: '#888',
          fontSize: '0.85rem',
          textAlign: 'center',
          marginTop: '0.5rem',
        }}
      >
        {descripcion}
      </p>
      <Link
        href={`/programas/${slug}`}
        className="btn-animated"
        style={{
          background: '#c61d4a',
          color: '#fff',
          border: 'none',
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          cursor: 'pointer',
          textDecoration: 'none',
          display: 'inline-block',
          borderRadius: '4px',
        }}
      >
        Ver episodios
      </Link>
    </article>
  )
}
