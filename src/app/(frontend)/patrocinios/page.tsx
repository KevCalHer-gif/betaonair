import Link from 'next/link';

const beneficios = [
  {
    icono: '📡',
    titulo: 'Alcance',
    descripcion:
      'Llegamos a miles de bolivianos cada semana a través de YouTube, TikTok, Facebook, Instagram y transmisiones en vivo.',
  },
  {
    icono: '💼',
    titulo: 'Contenido Patrocinado',
    descripcion:
      'Integramos tu marca de forma orgánica en nuestros programas, podcasts y redes sociales con menciones y segmentos dedicados.',
  },
  {
    icono: '📺',
    titulo: 'Presencia en Vivo',
    descripcion:
      'Tu marca puede estar presente en nuestras transmisiones en vivo, con menciones en tiempo real y elementos visuales personalizados.',
  },
];

export default function PatrociniosPage() {
  return (
    <main>
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
          Promociona tu marca con Beta On Air
        </h1>
        <p
          style={{
            color: '#aaa',
            maxWidth: 700,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Beta On Air es una plataforma digital de contenidos bolivianos con alcance en
          toda Bolivia y la diáspora. A través de nuestros programas, redes sociales y
          transmisiones en vivo, conectamos marcas con una audiencia joven, activa y
          comprometida.
        </p>
      </section>

      <section
        style={{
          padding: '3rem 1rem',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            fontSize: '2rem',
            textAlign: 'center',
            marginBottom: '2rem',
          }}
        >
          Beneficios
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {beneficios.map((b, idx) => (
            <div
              key={idx}
              style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: 8,
                padding: '1.5rem',
                textAlign: 'center',
                maxWidth: 320,
                flex: '1 1 280px',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{b.icono}</div>
              <h3
                style={{
                  fontFamily: 'var(--font-brand)',
                  color: '#c61d4a',
                  fontSize: '1.2rem',
                  margin: '0 0 0.5rem',
                }}
              >
                {b.titulo}
              </h3>
              <p style={{ color: '#aaa', margin: 0 }}>{b.descripcion}</p>
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
          Contáctanos
        </Link>
      </section>
    </main>
  );
}
