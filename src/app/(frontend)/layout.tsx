import React from 'react'
import localFont from 'next/font/local'
import './styles.css'
import ParticleTrail from '../../components/ui/ParticleTrail'

const brandFont = localFont({
  src: './../../fonts/chinese_rocks_rg.otf',
  variable: '--font-brand',
  display: 'swap',
})

export const metadata = {
  description: 'Beta On Air — Hacemos que se note.',
  title: 'Beta On Air',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={brandFont.variable}>
      <body>
        <ParticleTrail />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      </body>
    </html>
  )
}
