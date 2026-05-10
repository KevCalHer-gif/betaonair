import React from 'react'
import './styles.css'
import ParticleTrail from '../../components/ui/ParticleTrail'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <ParticleTrail />
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
      </body>
    </html>
  )
}
