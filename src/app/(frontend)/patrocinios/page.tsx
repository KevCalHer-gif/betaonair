import Image from 'next/image';
import Link from 'next/link';

const beneficios = [
  {
    icono: '📡',
    titulo: 'Alcance digital',
    descripcion:
      'Presencia en YouTube, TikTok, Facebook e Instagram con miles de seguidores activos.',
  },
  {
    icono: '🎙️',
    titulo: 'Contenido auténtico',
    descripcion:
      'Integramos tu marca de forma natural en nuestros programas y transmisiones en vivo.',
  },
  {
    icono: '🇧🇴',
    titulo: 'Audiencia boliviana',
    descripcion:
      'Conectamos tu marca directamente con la audiencia boliviana que consume contenido local.',
  },
];

const programas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino' },
  { nombre: 'The Bronta Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast' },
];

export default function PatrociniosPage() {
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
          Llegamos a miles de bolivianos cada semana a través de nuestros programas, redes sociales
          y transmisiones en vivo.
        </p>
      </section>

      {/* ¿Por qué elegirnos? */}
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
          ¿Por qué elegirnos?
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

      {/* Nuestros programas */}
      <section
        style={{
          padding: '3rem 1rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            fontSize: '2rem',
            marginBottom: '2rem',
          }}
        >
          Nuestros programas
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {programas.map((p, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <Image
                src={p.logo}
                alt={p.nombre}
                width={160}
                height={160}
                style={{ objectFit: 'contain' }}
              />
              <p style={{ fontFamily: 'var(--font-brand)', color: '#f0f0f0', marginTop: '0.5rem' }}>
                {p.nombre}
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
          ¿Listo para destacar?
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
