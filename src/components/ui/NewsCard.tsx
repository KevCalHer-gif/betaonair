'use client'

import Link from 'next/link'

interface NewsCardProps {
  titulo: string
  fecha: string
  slug: string
  resumen: string
}

export default function NewsCard({ titulo, fecha, slug, resumen }: NewsCardProps) {
  return (
    <article
      className="card-noticia fade-in-up"
      style={{
        background: '#0a0a0a',
        padding: '1.5rem',
        borderRadius: '4px',
        marginBottom: '1.5rem',
        borderLeft: '3px solid #c61d4a',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#f0f0f0',
          fontSize: '1.3rem',
          margin: '0 0 0.5rem',
        }}
      >
        {titulo}
      </h2>
      <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{fecha}</p>
      <p style={{ color: '#aaa', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>{resumen}</p>
      <Link
        href={`/noticias/${slug}`}
        className="btn-animated"
        style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 'bold' }}
      >
        Leer más →
      </Link>
    </article>
  )
}
