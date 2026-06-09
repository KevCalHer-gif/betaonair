import { notFound } from 'next/navigation'
import { getProgramBySlug } from '../../../../lib/api/programs'
import { getEpisodesByProgram } from '../../../../lib/api/episodes'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ProgramSlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programa = await getProgramBySlug(slug)
  if (!programa) notFound()

  // Obtener episodios reales del CMS filtrados por el slug del programa
  const episodios = await getEpisodesByProgram(slug)

  const coverImage = (programa.coverImage as any)
  const logo = (programa.logo as any)
  const rawBg = (programa as any).backgroundImage
  const coverSrc = coverImage?.sizes?.program_cover?.url || coverImage?.url || logo?.sizes?.program_logo?.url || logo?.url || ''
  const coverAlt = `Portada de ${programa.title}`

  const bgImage = rawBg as any
  const bgSrc = bgImage?.url || bgImage?.sizes?.program_cover?.url || null

  return (
    <>
      {/* ── Overlay de background personalizado (solo si existe en Payload) ── */}
      {bgSrc && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
          }}
        >
          <Image
            src={bgSrc}
            alt={`Fondo de ${programa.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
            unoptimized={bgSrc.endsWith('.gif') || bgSrc.endsWith('.svg')}
          />
        </div>
      )}

      {/* Contenido principal */}
      {/* margin-top: -2rem para eliminar el padding del layout global y pegar la portada al nav */}
      <main style={{ minHeight: '100vh', padding: '0 1rem 2rem 1rem', maxWidth: '900px', margin: '-2rem auto 0 auto', position: 'relative', zIndex: 0 }}>
        {/* ── Portada FULL-WIDTH (100vw) pegada al nav, relación 19:5 ── */}
        <div
          style={{
            width: '100vw',
            position: 'relative',
            left: '50%',
            right: '50%',
            marginLeft: '-50vw',
            marginRight: '-50vw',
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

        {/* Sección de episodios — datos reales desde el CMS */}
        <div style={{
          background: '#0a0a0a',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '2rem',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            fontSize: '1.4rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}>
            Episodios
          </h2>
          {episodios.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {episodios.map((ep) => (
                <div key={ep.id} style={{
                  border: '1px solid #333',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  background: '#111',
                }}>
                  {/* Thumbnail del episodio */}
                  {ep.thumbnail ? (
                    <div style={{
                      width: '100%',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      marginBottom: '0.75rem',
                      position: 'relative',
                      aspectRatio: '16 / 9',
                      background: '#0a0a0a',
                    }}>
                      <Image
                        src={(ep.thumbnail as any).url}
                        alt={ep.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '100%',
                      aspectRatio: '16 / 9',
                      background: '#0a0a0a',
                      borderRadius: '6px',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#333',
                      fontSize: '0.8rem',
                    }}>
                      Sin miniatura
                    </div>
                  )}
                  <h3 style={{
                    color: '#f0f0f0',
                    fontSize: '1.1rem',
                    marginBottom: '0.75rem',
                  }}>
                    {ep.title}
                  </h3>
                  {ep.publishedAt && (
                    <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      {new Date(ep.publishedAt).toLocaleDateString('es-BO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  {ep.embedUrl ? (
                    <div style={{
                      width: '100%',
                      borderRadius: '6px',
                      overflow: 'hidden',
                    }}>
                      <iframe
                        src={ep.embedUrl}
                        title={ep.title}
                        style={{
                          width: '100%',
                          aspectRatio: '16 / 9',
                          border: 'none',
                          display: 'block',
                        }}
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <p style={{ color: '#555', fontSize: '0.9rem', fontStyle: 'italic' }}>
                      Video no disponible aún.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#555', fontSize: '0.9rem' }}>
                Los episodios estarán disponibles próximamente.
              </p>
              <p style={{ color: '#333', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Seguinos en YouTube y TikTok para no perderte nada.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}