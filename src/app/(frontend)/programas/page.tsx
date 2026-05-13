import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '../../../payload.config'

const fallbackProgramas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids', descripcion: 'El espacio de entretenimiento educativo para los más pequeños de la casa.' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino', descripcion: 'Conversaciones profundas sobre cultura, historia y el camino de Bolivia.' },
  { nombre: 'The Bronta Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time', descripcion: 'El programa de entretenimiento y humor que no te puedes perder.' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas', descripcion: 'Las voces femeninas que rompen el silencio y generan conversación.' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast', descripcion: 'El podcast boliviano que habla de todo lo que importa.' },
]

async function fetchPrograms() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'programs',
      limit: 20,
      sort: 'order',
    })
    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc) => ({
        nombre: doc.title as string,
        slug: doc.slug as string,
        descripcion: (doc.description as string) || '',
        logo: (doc.logo as any)?.url || `/images/programas/${doc.slug}.png`,
      }))
    }
  } catch (error) {
    console.error('Error fetching programs:', error)
  }
  return fallbackProgramas
}

export default async function ProgramasPage() {
  const programas = await fetchPrograms()

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Nuestros Programas
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {programas.map((prog) => (
          <article
            key={prog.slug}
            style={{
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem',
              width: '220px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
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
