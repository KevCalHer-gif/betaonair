import React from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import './styles.css'
import ParticleTrail from '../../components/ui/ParticleTrail'
import BackgroundDrip from '../../components/ui/BackgroundDrip'

const brandFont = localFont({
  src: '../fonts/chinese_rocks_rg.otf',
  variable: '--font-brand',
  display: 'swap',
})

export const metadata = {
  description: 'Beta On Air — Hacemos que se note.',
  title: 'Beta On Air',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const year = new Date().getFullYear()

  const linkStyle: React.CSSProperties = {
    color: '#ccc',
    textDecoration: 'none',
    marginRight: '1rem',
  }

  return (
    <html lang="en" className={brandFont.variable}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0a0a', color: '#f0f0f0' }}>
        <BackgroundDrip />
        <ParticleTrail />
        <nav style={{ display: 'flex', gap: '1.5rem', padding: '1rem 2rem', background: '#111', borderBottom: '1px solid #333', position: 'relative', zIndex: 2 }}>
          <Link href="/" style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 'bold' }}>
            Beta On Air
          </Link>
          <Link href="/servicios" style={linkStyle}>Servicios</Link>
          <Link href="/portafolio" style={linkStyle}>Portafolio</Link>
          <Link href="/blog" style={linkStyle}>Blog</Link>
          <Link href="/contacto" style={linkStyle}>Contacto</Link>
        </nav>
        <main style={{ position: 'relative', zIndex: 1, flex: 1, padding: '2rem' }}>
          {children}
        </main>
        <footer style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid #333', color: '#888', position: 'relative', zIndex: 2 }}>
          © {year} Beta On Air. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  )
}
