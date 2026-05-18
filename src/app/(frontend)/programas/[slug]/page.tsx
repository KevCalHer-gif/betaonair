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

  const coverSrc = programa.coverImage ?? programa.logo
  const coverAlt = `Portada de ${programa.nombre}`

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
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

      {/* Banner rectangular de portada */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '56.25%', // 16:9 ratio
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        }}
      >
        <Image
          src={coverSrc}
          alt={coverAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        {/* Overlay sutil para mejorar legibilidad del título (opcional) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)',
          }}
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
