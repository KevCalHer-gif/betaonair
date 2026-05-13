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

const logos = [
  { src: '/images/programas/logo1.png', alt: 'Programa 1' },
  { src: '/images/programas/logo2.png', alt: 'Programa 2' },
  { src: '/images/programas/logo3.png', alt: 'Programa 3' },
  { src: '/images/programas/logo4.png', alt: 'Programa 4' },
  { src: '/images/programas/logo5.png', alt: 'Programa 5' },
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
          {logos.map((logo, idx) => (
            <Image
              key={idx}
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={80}
              style={{ objectFit: 'contain' }}
            />
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
