import { notFound } from 'next/navigation'
import { programas } from '../../../../lib/data/programas'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProgramSlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programa = programas.find((p) => p.slug === slug)
  if (!programa) notFound()

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link
        href="/programas"
        style={{
          color: '#c61d4a',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        ← Volver a programas
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Image
          src={programa.logo}
          alt={programa.nombre}
          width={300}
          height={300}
          style={{ objectFit: 'contain', maxHeight: '200px', width: 'auto' }}
        />
      </div>

      <h1 style={{
        fontFamily: 'var(--font-brand)',
        color: '#c61d4a',
        fontSize: '2rem',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        {programa.nombre}
      </h1>

      <p style={{
        color: '#aaa',
        fontSize: '1rem',
        lineHeight: '1.8',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        {programa.descripcion}
      </p>

      <div style={{
        background: '#0a0a0a',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '2rem',
        textAlign: 'center',
      }}>
        <h2 style={{ color: '#f0f0f0', fontSize: '1.2rem', marginBottom: '1rem' }}>
          Episodios
        </h2>
        <p style={{ color: '#555', fontSize: '0.9rem' }}>
          Los episodios estarán disponibles próximamente.
        </p>
        <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Seguinos en YouTube y TikTok para no perderte nada.
        </p>
      </div>
    </main>
  )
}
