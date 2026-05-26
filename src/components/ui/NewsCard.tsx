'use client'

import Link from 'next/link'
import '@/app/(frontend)/animations.css'

interface CategoryBadge {
  id?: number
  name: string
  color?: string | null
}

interface NewsCardProps {
  titulo: string
  fecha: string
  slug: string
  resumen: string
  categories?: CategoryBadge[]
}

export default function NewsCard({ titulo, fecha, slug, resumen, categories }: NewsCardProps) {
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
      {categories && categories.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
          {categories.map((cat, idx) => (
            <span
              key={cat.id || idx}
              style={{
                display: 'inline-block',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontSize: '0.7rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: cat.color || '#c61d4a',
                color: '#fff',
              }}
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}
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
