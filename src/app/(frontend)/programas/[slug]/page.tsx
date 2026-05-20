import { notFound } from 'next/navigation'
import { getProgramBySlug } from '../../../../lib/api/programs'
import Link from 'next/link'
import Image from 'next/image'

export default async function ProgramSlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programa = await getProgramBySlug(slug)
  if (!programa) notFound()

  const coverImage = (programa.coverImage as any)
  const logo = (programa.logo as any)
  const coverSrc = coverImage?.sizes?.program_cover?.url || coverImage?.url || logo?.sizes?.program_logo?.url || logo?.url || ''
  const coverAlt = `Portada de ${programa.title}`

  return (
    <main style={{ minHeight: '100vh', padding: '0 1rem 2rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Banner rectangular de portada con relación 19:5 (1900×500) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: `${(500 / 1900) * 100}%`, // 19:5 ratio (~26.3158%)
          borderRadius: '0 0 12px 12px',
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
        {/* Overlay sutil para mejorar legibilidad */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)',
          }}
        />
      </div>

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

      <h1 style={{
        fontFamily: 'var(--font-brand)',
        color: '#c61d4a',
        fontSize: '2rem',
        marginBottom: '1rem',
        textAlign: 'center',
      }}>
        {programa.title}
      </h1>

      <p style={{
        color: '#aaa',
        fontSize: '1rem',
        lineHeight: '1.8',
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        {programa.description}
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
