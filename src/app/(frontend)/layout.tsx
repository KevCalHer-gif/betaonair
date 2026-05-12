import React from 'react'
import Link from 'next/link'
import localFont from 'next/font/local'
import './styles.css'
import ParticleTrail from '../../components/ui/ParticleTrail'
import InkWaterBackground from '../../components/ui/InkWaterBackground'

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
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'transparent', color: '#f0f0f0' }}>
        <InkWaterBackground />
        <ParticleTrail />
        <nav style={{ display: 'flex', gap: '1.5rem', padding: '1rem 2rem', background: '#111', borderBottom: '1px solid #333', position: 'relative', zIndex: 2 }}>
          <Link href="/" style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 'bold' }}>Inicio</Link>
          <Link href="/programas" style={linkStyle}>Programas</Link>
          <Link href="/en-vivo" style={linkStyle}>En Vivo</Link>
          <Link href="/noticias" style={linkStyle}>Noticias</Link>
          <Link href="/patrocinios" style={linkStyle}>Patrocinios</Link>
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
