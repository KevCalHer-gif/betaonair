import Link from 'next/link'

const servicios = [
  {
    icono: '📹',
    titulo: 'Producción Audiovisual',
    descripcion:
      'Producción de videos, spots publicitarios, motion graphics y animación 2D para tu marca o proyecto.',
  },
  {
    icono: '🎨',
    titulo: 'Diseño Gráfico',
    descripcion:
      'Branding, identidad visual, diseño editorial y piezas publicitarias con estética boliviana contemporánea.',
  },
  {
    icono: '🎤',
    titulo: 'Producción de Podcast',
    descripcion:
      'Grabación, edición y distribución de podcasts profesionales con equipamiento de estudio propio.',
  },
  {
    icono: '📱',
    titulo: 'Gestión de Redes Sociales',
    descripcion:
      'Estrategia de contenido, community management y campañas digitales para hacer crecer tu presencia online.',
  },
]

export default function ServiciosPage() {
  return (
    <main>
      {/* Hero */}
      <section
        style={{
          padding: '4rem 1rem',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-brand)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            color: '#f0f0f0',
            marginBottom: '1rem',
          }}
        >
          Nuestros Servicios
        </h1>
        <p
          style={{
            color: '#aaa',
            maxWidth: 700,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Beta On Air ofrece servicios profesionales de producción para marcas y creadores
          bolivianos.
        </p>
      </section>

      {/* Grid de servicios */}
      <section
        style={{
          padding: '3rem 1rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {servicios.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 8,
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{s.icono}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  color: '#c61d4a',
                  fontSize: '1.3rem',
                  margin: '0 0 0.75rem',
                }}
              >
                {s.titulo}
              </h3>
              <p
                style={{
                  color: '#aaa',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.descripcion}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '4rem 1rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#f0f0f0',
            fontSize: '2rem',
            marginBottom: '1rem',
          }}
        >
          ¿Listo para empezar?
        </h2>
        <Link
          href="/contacto"
          style={{
            background: '#c61d4a',
            color: '#fff',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontFamily: 'var(--font-brand)',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 4,
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Solicita una cotización
        </Link>
      </section>
    </main>
  )
}
