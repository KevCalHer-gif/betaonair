import Image from 'next/image'
import { notFound } from 'next/navigation'

const programas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids', descripcion: 'El espacio de entretenimiento educativo para los más pequeños de la casa.' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino', descripcion: 'Conversaciones profundas sobre cultura, historia y el camino de Bolivia.' },
  { nombre: 'The Bronta Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time', descripcion: 'El programa de entretenimiento y humor que no te puedes perder.' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas', descripcion: 'Las voces femeninas que rompen el silencio y generan conversación.' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast', descripcion: 'El podcast boliviano que habla de todo lo que importa.' },
]

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProgramasSlugPage({ params }: Props) {
  const { slug } = await params
  const programa = programas.find((p) => p.slug === slug)
  if (!programa) {
    notFound()
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image
        src={programa.logo}
        alt={programa.nombre}
        width={300}
        height={300}
        style={{ objectFit: 'contain' }}
      />
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '1.8rem',
          marginTop: '1.5rem',
          textAlign: 'center',
        }}
      >
        {programa.nombre}
      </h1>
      <p style={{ color: '#888', fontSize: '1rem', textAlign: 'center', marginTop: '1rem', maxWidth: '600px' }}>
        {programa.descripcion}
      </p>
      <p style={{ color: '#bbb', fontSize: '0.9rem', marginTop: '2rem' }}>
        Episodios próximamente
      </p>
    </main>
  )
}
