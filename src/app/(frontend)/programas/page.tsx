'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const programas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids', descripcion: 'El espacio de entretenimiento educativo para los más pequeños de la casa.' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino', descripcion: 'Conversaciones profundas sobre cultura, historia y el camino de Bolivia.' },
  { nombre: 'The Bronta Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time', descripcion: 'El programa de entretenimiento y humor que no te puedes perder.' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas', descripcion: 'Las voces femeninas que rompen el silencio y generan conversación.' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast', descripcion: 'El podcast boliviano que habla de todo lo que importa.' },
]

export default function ProgramasPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [hoverBtn, setHoverBtn] = useState<string | null>(null)

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Nuestros Programas
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {programas.map((prog) => (
          <article
            key={prog.slug}
            onMouseEnter={() => setHoveredSlug(prog.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem',
              width: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform:
                hoveredSlug === prog.slug
                  ? 'translateY(-12px) scale(1.04)'
                  : 'translateY(0) scale(1)',
              boxShadow:
                hoveredSlug === prog.slug
                  ? '0 0 30px rgba(198,29,74,0.5), 0 20px 40px rgba(0,0,0,0.6)'
                  : 'none',
              borderColor: hoveredSlug === prog.slug ? '#c61d4a' : '#333',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer',
            }}
          >
            <Image
              src={prog.logo}
              alt={prog.nombre}
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
              {prog.nombre}
            </h2>
            <p style={{ color: '#888', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem' }}>
              {prog.descripcion}
            </p>
            <Link
              href={`/programas/${prog.slug}`}
              onMouseEnter={() => setHoverBtn(prog.slug)}
              onMouseLeave={() => setHoverBtn(null)}
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
                transform: hoverBtn === prog.slug ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow:
                  hoverBtn === prog.slug ? '0 0 20px rgba(198,29,74,0.7)' : 'none',
                filter: hoverBtn === prog.slug ? 'brightness(1.2)' : 'brightness(1)',
                transition: 'all 0.25s ease',
              }}
            >
              Ver episodios
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
