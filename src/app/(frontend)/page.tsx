import React from 'react'
import HeroSection from '../../components/sections/HeroSection'
import ProgramCard from '../../components/sections/ProgramCard'
import ExternalLinkCard from '../../components/sections/ExternalLinkCard'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <section>
        <h2>En Vivo</h2>
      </section>
      <section style={{ padding: '2rem 0' }}>
        <h2 style={{ color: '#c61d4a', marginBottom: '2rem', textAlign: 'center' }}>Programas Destacados</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
          <ProgramCard
            title="BetaKids"
            embedUrl="https://www.youtube.com/embed/myyHYsOQQJE"
            moreLink="/programas/betakids"
          />
          <ExternalLinkCard
            title="No Tan Calladitas"
            description="Desde TikTok directamente"
            href="https://www.tiktok.com/@betaonair/video/7638564100347399432"
          />
        </div>
      </section>
      <section>
        <h2>Noticias</h2>
      </section>
    </>
  )
}
