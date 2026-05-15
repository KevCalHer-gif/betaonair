import React from 'react'
import HeroSection from '../../components/sections/HeroSection'
import ProgramCard from '../../components/sections/ProgramCard'

const programas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino' },
  { nombre: 'The Bronca Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast' },
]

const noticias = [
  { titulo: 'Beta On Air lanza su nueva temporada de programas', fecha: '10 mayo 2026', resumen: 'La plataforma digital de contenidos bolivianos arranca con fuerza su nueva temporada con cinco programas renovados.' },
  { titulo: 'No Tan Calladitas: voces que rompen el silencio', fecha: '8 mayo 2026', resumen: 'El programa que da voz a las mujeres bolivianas regresa con historias que inspiran y generan conversación.' },
  { titulo: 'Beta Kids: entretenimiento educativo para los más pequeños', fecha: '5 mayo 2026', resumen: 'El espacio dedicado a niños y niñas continúa creciendo con contenido divertido y con valores.' },
]

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section>
        <h2>En Vivo</h2>
      </section>
      <section style={{ padding: '2rem 0' }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Nuestros Programas
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {programas.map((p) => (
            <div key={p.slug} className="card-programa fade-in-up" style={{ display: 'flex' }}>
              <ProgramCard nombre={p.nombre} logo={p.logo} slug={p.slug} />
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: '2rem 0', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Últimas Noticias
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 700, margin: '0 auto' }}>
          {noticias.map((n, i) => (
            <div
              key={i}
              style={{
                background: '#0a0a0a',
                borderLeft: '3px solid #c61d4a',
                borderRadius: 4,
                padding: '1rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-brand)', color: '#f0f0f0', margin: 0, fontSize: '1.1rem' }}>
                {n.titulo}
              </h3>
              <p style={{ color: '#888', margin: '0.25rem 0 0.5rem', fontSize: '0.85rem' }}>{n.fecha}</p>
              <p style={{ color: '#aaa', margin: 0, fontSize: '0.9rem' }}>{n.resumen}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
