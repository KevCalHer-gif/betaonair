import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getServiceBySlug } from '../../../../lib/api/services'
import { getProjectsByService } from '../../../../lib/api/projects'
import { getSponsorships } from '../../../../lib/api/sponsorships'

/**
 * Extrae texto plano de la estructura JSON de richText (Lexical) de Payload.
 */
function extractPlainText(richText: any): string {
  if (!richText) return ''
  try {
    const root = richText.root || richText
    const children = root.children || []
    return children
      .map((block: any) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        return ''
      })
      .join(' ')
      .trim()
  } catch {
    return ''
  }
}

export default async function ServicioSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const servicio = await getServiceBySlug(slug)
  if (!servicio) notFound()

  const proyectos = await getProjectsByService(slug)
  const sponsors = await getSponsorships()

  return (
    <main style={{ minHeight: '100vh', padding: '0 1rem 2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Back link */}
      <Link
        href="/servicios"
        style={{
          color: '#c61d4a',
          textDecoration: 'none',
          display: 'inline-block',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        ← Volver a servicios
      </Link>

      {/* Service header */}
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        {servicio.title}
      </h1>

      {servicio.description && (
        <p
          style={{
            color: '#aaa',
            fontSize: '1.05rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto 2rem',
          }}
        >
          {extractPlainText(servicio.description)}
        </p>
      )}

      {/* Features */}
      {servicio.features && servicio.features.length > 0 && (
        <div
          style={{
            background: '#0a0a0a',
            border: '1px solid #333',
            borderRadius: '8px',
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-brand)',
              color: '#c61d4a',
              fontSize: '1.2rem',
              marginBottom: '1rem',
            }}
          >
            Qué incluye
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#ccc', fontSize: '0.95rem', lineHeight: '2' }}>
            {servicio.features.map((f, i) => (
              <li key={f.id || i} style={{ padding: '0.3rem 0' }}>
                ✓ {f.feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price */}
      {servicio.price != null && servicio.price > 0 && (
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Precio de referencia</p>
          <p style={{ color: '#c61d4a', fontWeight: '700', fontSize: '2rem', margin: 0 }}>
            Bs. {servicio.price.toLocaleString()}
          </p>
        </div>
      )}

      {/* Portfolio section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            fontSize: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          Trabajos realizados
        </h2>

        {proyectos.length === 0 ? (
          <p style={{ color: '#555', textAlign: 'center', fontStyle: 'italic', padding: '2rem 0' }}>
            Próximamente mostraremos aquí nuestros trabajos para este servicio.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {proyectos.map((proj) => {
              const thumb = proj.thumbnail as { url?: string; sizes?: { thumbnail?: { url?: string } } } | number | null | undefined
              const imgSrc = typeof thumb === 'object' && thumb !== null
                ? (thumb.sizes?.thumbnail?.url || thumb.url || '')
                : ''

              return (
                <div
                  key={proj.id}
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                >
                  {imgSrc ? (
                    <div style={{ position: 'relative', width: '100%', height: '180px', background: '#111' }}>
                      <Image
                        src={imgSrc}
                        alt={proj.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '100%',
                        height: '180px',
                        background: '#111',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#555',
                        fontSize: '0.85rem',
                      }}
                    >
                      Sin imagen
                    </div>
                  )}
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ color: '#f0f0f0', fontSize: '1rem', marginBottom: '0.5rem' }}>
                      {proj.title}
                    </h3>
                    {proj.client && (
                      <p style={{ color: '#c61d4a', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        Cliente: {proj.client}
                      </p>
                    )}
                    {proj.description && (
                      <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: '1.5', margin: 0 }}>
                        {extractPlainText(proj.description).substring(0, 120)}
                        {extractPlainText(proj.description).length > 120 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Marquee / Banda de sponsors */}
      {sponsors.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-brand)',
              color: '#c61d4a',
              fontSize: '1.5rem',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}
          >
            Marcas que confían en nosotros
          </h2>

          <div
            style={{
              overflow: 'hidden',
              background: '#0a0a0a',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '1.5rem 0',
              position: 'relative',
            }}
          >
            {/* Inline style for the marquee animation */}
            <style>{`
              @keyframes marqueeScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-100%); }
              }
              .marquee-track {
                display: flex;
                gap: 2rem;
                animation: marqueeScroll 25s linear infinite;
                width: max-content;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="marquee-track" style={{ padding: '0 1rem' }}>
              {/* Duplicated for seamless loop */}
              {[...sponsors, ...sponsors].map((sp, i) => {
                const logo = sp.logo as { url?: string; sizes?: { thumbnail?: { url?: string } } } | number | null | undefined
                const logoSrc = typeof logo === 'object' && logo !== null
                  ? (logo.sizes?.thumbnail?.url || logo.url || '')
                  : ''

                return (
                  <div
                    key={`${sp.id}-${i}`}
                    style={{
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      minWidth: '120px',
                    }}
                  >
                    {logoSrc ? (
                      <Image
                        src={logoSrc}
                        alt={sp.name}
                        width={80}
                        height={80}
                        style={{ objectFit: 'contain', filter: 'grayscale(0.5)', opacity: 0.8 }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '80px',
                          height: '80px',
                          background: '#1a1a1a',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#666',
                          fontSize: '0.7rem',
                        }}
                      >
                        LOGO
                      </div>
                    )}
                    <span style={{ color: '#888', fontSize: '0.75rem', textAlign: 'center' }}>
                      {sp.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link
          href="/contacto"
          style={{
            background: '#c61d4a',
            color: '#fff',
            padding: '0.85rem 2.5rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            letterSpacing: '0.06em',
            display: 'inline-block',
          }}
        >
          Solicita este servicio
        </Link>
      </div>
    </main>
  )
}
