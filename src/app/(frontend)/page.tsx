import React from 'react'
import HeroSection from '../../components/sections/HeroSection'
import ProgramCard from '../../components/sections/ProgramCard'

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
            embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            moreLink="/programas/betakids"
          />
          <ProgramCard
            title="No Tan Calladitas"
            embedUrl="https://www.youtube.com/embed/9bZkp7q19f0"
            moreLink="/programas/no-tan-calladitas"
          />
        </div>
      </section>
      <section>
        <h2>Noticias</h2>
      </section>
    </>
  )
}
