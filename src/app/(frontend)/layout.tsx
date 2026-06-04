import Stickers from '../../components/global/Stickers'
import React from 'react'
import Link from 'next/link'
import './styles.css'
import './animations.css'
import ParticleTrail from '../../components/ui/ParticleTrail'
import BgCanvas from '../../components/ui/BgCanvas'
import NavLink from '../../components/ui/NavLink'
import TrackPageView from '../../components/ui/TrackPageView'
import { getSettings } from '../../lib/api/settings'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const seoGlobal = await payload.findGlobal({ slug: 'seo' })
  const settings = await payload.findGlobal({ slug: 'settings' })

  const siteName = settings?.siteName || 'Beta On Air'
  const defaultDescription = 'Beta On Air — Hacemos que se note.'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''

  const ogImageUrl =
    seoGlobal?.ogImage && typeof seoGlobal.ogImage === 'object' && seoGlobal.ogImage.url
      ? seoGlobal.ogImage.url.startsWith('http')
        ? seoGlobal.ogImage.url
        : `${siteUrl}${seoGlobal.ogImage.url}`
      : null

  return {
    title: seoGlobal?.metaTitle || siteName,
    description: seoGlobal?.metaDescription || defaultDescription,
    openGraph: {
      title: seoGlobal?.metaTitle || siteName,
      description: seoGlobal?.metaDescription || defaultDescription,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl }] } : {}),
    },
  }
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const year = new Date().getFullYear()
  const settings = await getSettings()
  const siteName = settings?.siteName || 'Beta On Air'
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="es">
        <head>
          {gaId && (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
              <script dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
              }} />
            </>
          )}
        </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent', color: '#f0f0f0', fontFamily: "'Chinese Rocks Rg', sans-serif" }}>
        <BgCanvas />
        <ParticleTrail />
        <Stickers />
        <TrackPageView />
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