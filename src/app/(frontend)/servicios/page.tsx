import React from 'react'
import Link from 'next/link'

const servicios = [
  { icono: '🎬', titulo: 'Producción Audiovisual', descripcion: 'Creamos contenido de video profesional para tu marca, desde spots hasta documentales.' },
  { icono: '🎙️', titulo: 'Podcast', descripcion: 'Producimos y distribuimos podcasts con calidad de estudio y narrativa atractiva.' },
  { icono: '📡', titulo: 'Streaming en Vivo', descripcion: 'Transmitimos eventos en vivo con múltiples cámaras y audio profesional.' },
  { icono: '🎨', titulo: 'Diseño Gráfico', descripcion: 'Diseñamos identidad visual, piezas digitales y material promocional para redes.' },
]

export default function ServiciosPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Servicios
      </h1>
      <p style={{ color: '#888', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Transformamos tus ideas en contenido de alto impacto. Conocé lo que podemos hacer por tu marca o proyecto.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {servicios.map((s) => (
          <div key={s.titulo} style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icono}</div>
            <h3 style={{ color: '#c61d4a', fontSize: '1rem', marginBottom: '0.5rem' }}>{s.titulo}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{s.descripcion}</p>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/contacto" style={{ background: '#c61d4a', color: '#fff', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.06em' }}>
          Solicita una cotización
        </Link>
      </div>
    </main>
  )
}
