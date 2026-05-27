import React from 'react'
import Link from 'next/link'
import HeroSection from '../../components/sections/HeroSection'
import ProgramCard from '../../components/sections/ProgramCard'
import SocialMediaSection from '../../components/sections/SocialMediaSection'
import NewsCard from '../../components/ui/NewsCard'
import { getPrograms } from '../../lib/api/programs'
import { getNews } from '../../lib/api/news'
import { getLiveStreams } from '../../lib/api/live'
import { getSettings } from '../../lib/api/settings'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const programas = await getPrograms()
  const noticias = (await getNews()).slice(0, 3)
  const liveStreams = await getLiveStreams()
  const activeStream = liveStreams[0] || null
  const settings = await getSettings()

  return (
    <>
      <HeroSection
        logoUrl={settings?.logoUrl || null}
        slogan={settings?.slogan || null}
      />
      <section style={{ padding: '2rem 1rem', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.8rem',
          }}
        >
          En Vivo
        </h2>
        {activeStream && activeStream.embedUrl ? (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {activeStream.title && (
              <p
                style={{
                  color: '#f0f0f0',
                  textAlign: 'center',
                  fontSize: '1rem',
                  marginBottom: '0.75rem',
                  fontWeight: 'bold',
                }}
              >
                {activeStream.title}
              </p>
            )}
            <div
              style={{
                width: '100%',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #c61d4a55',
              }}
            >
              <iframe
                src={`${activeStream.embedUrl}${activeStream.embedUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1`}
                title={activeStream.title || 'Transmisión en vivo'}
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  border: 'none',
                  display: 'block',
                }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            {activeStream.program && typeof activeStream.program === 'object' && (
              <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
                <Link
                  href={`/programas/${(activeStream.program as any).slug}`}
                  style={{
                    color: '#c61d4a',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  Ver más de {(activeStream.program as any).title} →
                </Link>
              </p>
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div
              style={{
                background: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '8px',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                textAlign: 'center',
                padding: '2rem',
              }}
            >
              <span>
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>📡</span>
                No hay transmisión en vivo en este momento
              </span>
            </div>
          </div>
        )}
      </section>
      <section id="contenido" style={{ padding: '2rem 0' }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Nuestros Programas
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          {programas.map((p) => {
            const logoUrl = (p.logo as any)?.sizes?.program_logo?.url || (p.logo as any)?.url || ''
            return (
              <div key={p.slug} className="card-programa fade-in-up" style={{ display: 'flex' }}>
                <ProgramCard nombre={p.title} logo={logoUrl} slug={p.slug || ''} descripcion={p.description || ''} />
              </div>
            )
          })}
        </div>
      </section>
      <section style={{ padding: '2rem 0', position: 'relative', zIndex: 10 }}>
        <h2
          style={{
            fontFamily: 'var(--font-brand)',
            color: '#c61d4a',
            marginBottom: '2rem',
            textAlign: 'center',
          }}
        >
          Últimas Noticias
        </h2>
        {noticias.length === 0 ? (
          <p style={{ color: '#555', textAlign: 'center', padding: '2rem 0', fontStyle: 'italic' }}>
            No hay noticias publicadas aún.
          </p>
        ) : (
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            {noticias.map((n) => {
              const cats = (n.categories as any[] | undefined)?.map((c: any) => ({
                id: c.id,
                name: c.name,
                color: c.color,
              })) || []
              const cover = n.coverImage as { url?: string; alt?: string } | null | undefined
              const coverData = cover?.url
                ? { url: cover.url, alt: cover.alt }
                : null
              return (
                <NewsCard
                  key={n.id}
                  titulo={n.title}
                  fecha={
                    n.publishedAt
                      ? new Date(n.publishedAt).toLocaleDateString('es-BO', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''
                  }
                  slug={n.slug || ''}
                  resumen={n.excerpt || ''}
                  categories={cats}
                  coverImage={coverData}
                />
              )
            })}
          </div>
        )}
      </section>
      <SocialMediaSection
        tiktokUrl={settings?.tiktokUrl || null}
        facebookUrl={settings?.facebookUrl || null}
        youtubeUrl={settings?.youtubeUrl || null}
        instagramUrl={settings?.instagramUrl || null}
      />
    </>
  )
}
