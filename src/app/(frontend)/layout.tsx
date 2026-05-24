import Stickers from '../../components/global/Stickers'
import React from 'react'
import Link from 'next/link'
import './styles.css'
import './animations.css'
import { Analytics } from '@vercel/analytics/react'
import ParticleTrail from '../../components/ui/ParticleTrail'
import BgCanvas from '../../components/ui/BgCanvas'
import NavLink from '../../components/ui/NavLink'
import { getSeo, getSettings } from '../../lib/api/settings'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo()
  const settings = await getSettings()

  const siteName = settings?.siteName || 'Beta On Air'
  const defaultDescription = 'Beta On Air — Hacemos que se note.'

  return {
    title: seo?.metaTitle || siteName,
    description: seo?.metaDescription || defaultDescription,
    openGraph: {
      title: seo?.metaTitle || siteName,
      description: seo?.metaDescription || defaultDescription,
      ...(seo?.ogImage && typeof seo.ogImage === 'object' && seo.ogImage.url
        ? { images: [{ url: seo.ogImage.url }] }
        : {}),
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const year = new Date().getFullYear()
  const settings = await getSettings()
  const siteName = settings?.siteName || 'Beta On Air'

  return (
    <html lang="es">
        <head>
        </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent', color: '#f0f0f0', fontFamily: "'Chinese Rocks Rg', sans-serif" }}>
        <Analytics />
        <BgCanvas />
        <ParticleTrail />
        <Stickers />
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', padding: '0.75rem 2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
          <NavLink href="/programas">Programas</NavLink>
          <NavLink href="/en-vivo">En Vivo</NavLink>
          <NavLink href="/noticias">Noticias</NavLink>
          <NavLink href="/patrocinios">Patrocinios</NavLink>
          <NavLink href="/servicios">Servicios</NavLink>
          <NavLink href="/contacto">Contacto</NavLink>
        </nav>
        <main style={{ position: 'relative', zIndex: 10, flex: 1, padding: '2rem' }}>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid #333', color: '#888', position: 'relative', zIndex: 2 }}>
          © {year} {siteName} &nbsp;|&nbsp; <span style={{ color: '#555' }}>Seguinos en YouTube, TikTok e Instagram</span>
        </footer>
      </body>
    </html>
  )
}
