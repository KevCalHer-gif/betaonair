'use client'

interface ExternalLinkCardProps {
  title: string
  description: string
  href: string
}

export default function ExternalLinkCard({ title, description, href }: ExternalLinkCardProps) {
  return (
    <div style={{ background: '#111', border: '1px solid #333', borderRadius: 8, padding: '1rem', maxWidth: 400, margin: '0 auto' }}>
      <h3 style={{ color: '#c61d4a', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ color: '#f0f0f0', fontSize: '0.9rem', marginBottom: '1rem' }}>{description}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#c61d4a', textDecoration: 'none', fontWeight: 700 }}>
        Ver video →
      </a>
    </div>
  )
}
