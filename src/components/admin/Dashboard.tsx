'use client'

import { useEffect, useState } from 'react'

interface CardData {
  label: string
  icon: string
  count: number
  path: string
}

export default function Dashboard() {
  const [data, setData] = useState<CardData[]>([
    { label: 'Noticias publicadas', icon: '📰', count: 0, path: '/api/news?limit=0' },
    { label: 'Programas activos', icon: '📺', count: 0, path: '/api/programs?limit=0' },
    { label: 'Episodios totales', icon: '🎙️', count: 0, path: '/api/episodes?limit=0' },
    { label: 'Mensajes de contacto', icon: '✉️', count: 0, path: '/api/contacts?limit=0' },
    { label: 'Patrocinios activos', icon: '🤝', count: 0, path: '/api/sponsorships?limit=0' },
    { label: 'Transmisiones registradas', icon: '📡', count: 0, path: '/api/live?limit=0' },
  ])

  useEffect(() => {
    const fetchCounts = async () => {
      const updated = await Promise.all(
        data.map(async (card) => {
          try {
            const res = await fetch(card.path)
            if (!res.ok) throw new Error('Failed fetch')
            const json = await res.json()
            const totalDocs = json?.totalDocs ?? 0
            return { ...card, count: totalDocs }
          } catch {
            return { ...card, count: 0 }
          }
        })
      )
      setData(updated)
    }
    fetchCounts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem',
        background: '#1a1a1a',
        color: '#f0f0f0',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {data.map((card, idx) => (
        <div
          key={idx}
          style={{
            background: '#2a2a2a',
            border: `1px solid #3a3a3a`,
            borderRadius: 8,
            padding: '1rem 1.5rem',
            textAlign: 'center',
            minWidth: 160,
            flex: '1 0 auto',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{card.icon}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#c61d4a' }}>
            {card.count}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.25rem' }}>
            {card.label}
          </div>
        </div>
      ))}
    </div>
  )
}
