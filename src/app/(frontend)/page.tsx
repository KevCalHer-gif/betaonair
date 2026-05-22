import React from 'react'
import HeroSection from '../../components/sections/HeroSection'
import ProgramCard from '../../components/sections/ProgramCard'
import SocialMediaSection from '../../components/sections/SocialMediaSection'
import NewsCard from '../../components/ui/NewsCard'
import { getPrograms } from '../../lib/api/programs'
import { getNews } from '../../lib/api/news'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const programas = await getPrograms()
  const noticias = (await getNews()).slice(0, 3)

  return (
    <>
      <HeroSection />
      <section>
        <h2>En Vivo</h2>
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
            {noticias.map((n) => (
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
              />
            ))}
          </div>
        )}
      </section>
      <SocialMediaSection />
    </>
  )
}
