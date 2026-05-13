import Link from 'next/link'

const noticias = [
  {
    titulo: 'Beta On Air lanza su nueva temporada de programas',
    fecha: '10 mayo 2026',
    slug: 'nueva-temporada-2026',
    resumen: 'La plataforma digital de contenidos bolivianos arranca con fuerza su nueva temporada con cinco programas renovados y mucho contenido para toda la familia.',
  },
  {
    titulo: 'No Tan Calladitas: voces que rompen el silencio',
    fecha: '8 mayo 2026',
    slug: 'no-tan-calladitas-voces',
    resumen: 'El programa que da voz a las mujeres bolivianas regresa con historias que inspiran y generan conversación en toda Bolivia.',
  },
  {
    titulo: 'Beta Kids: entretenimiento educativo para los más pequeños',
    fecha: '5 mayo 2026',
    slug: 'beta-kids-temporada',
    resumen: 'El espacio dedicado a niños y niñas continúa creciendo con contenido divertido, educativo y con valores bolivianos.',
  },
  {
    titulo: 'Yukast celebra su primer aniversario al aire',
    fecha: '1 mayo 2026',
    slug: 'yukast-aniversario',
    resumen: 'El podcast boliviano que habla de todo lo que importa cumple un año con una emisión especial llena de sorpresas.',
  },
]

export default function NoticiasPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Últimas Noticias
      </h1>
      {noticias.map((n) => (
        <article
          key={n.slug}
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
            {n.titulo}
          </h2>
          <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 0.5rem' }}>{n.fecha}</p>
          <p style={{ color: '#aaa', fontSize: '0.95rem', margin: '0 0 0.75rem' }}>{n.resumen}</p>
          <Link
            href={`/noticias/${n.slug}`}
            className="btn-animated"
            style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 'bold' }}
          >
            Leer más →
          </Link>
        </article>
      ))}
    </main>
  )
}
