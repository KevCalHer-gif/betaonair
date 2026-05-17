import React from 'react'
import Link from 'next/link'

export default function PatrociniosPage() {
  const beneficios = [
    { icono: '📡', titulo: 'Alcance en vivo', desc: 'Tu marca presente en cada transmisión en vivo del canal.' },
    { icono: '🎙️', titulo: 'Mención en programas', desc: 'Integración orgánica en los programas de Beta On Air.' },
    { icono: '📱', titulo: 'Redes sociales', desc: 'Presencia en YouTube, TikTok y todas nuestras plataformas.' },
    { icono: '🎯', titulo: 'Audiencia boliviana', desc: 'Conectá con una comunidad activa y comprometida.' },
  ]

  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'var(--font-brand)',
        color: '#c61d4a',
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '1rem',
      }}>
        Patrocina Beta On Air
      </h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Hacemos que tu marca se note. Llegá a miles de bolivianos a través de nuestros programas, transmisiones en vivo y redes sociales.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
        {beneficios.map((b) => (
          <div key={b.titulo} style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '1.5rem',
            width: '200px',
            textAlign: 'center',
            transition: 'border-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#c61d4a')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = '#333')}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{b.icono}</div>
            <h3 style={{ color: '#f0f0f0', fontSize: '0.95rem', marginBottom: '0.5rem' }}>{b.titulo}</h3>
            <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>{b.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#888', marginBottom: '1.5rem' }}>
          ¿Querés saber más? Escribinos y armamos una propuesta para tu marca.
        </p>
        <Link href="/contacto" style={{
          background: '#c61d4a',
          color: '#fff',
          padding: '0.75rem 2rem',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: '700',
          fontSize: '0.9rem',
          letterSpacing: '0.06em',
        }}>
          Contactanos
        </Link>
      </div>
    </main>
  )
}
