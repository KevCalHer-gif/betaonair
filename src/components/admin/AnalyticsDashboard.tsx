'use client'

import React, { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const COLORS: Record<string, string> = {
  podcast: '#7F77DD',
  video: '#378ADD',
  noticia: '#639922',
  servicio: '#EF9F27',
  portafolio: '#E05538',
  'en-vivo': '#D43D6E',
  otro: '#888888',
  mobile: '#1D9E75',
  desktop: '#0F6E56',
  tablet: '#9FE1CB',
}

interface AnalyticsData {
  totalViews: number
  uniqueSessions: number
  bounceRate: number
  topContent: { title: string; slug: string; contentType: string; views: number }[]
  viewsByType: { type: string; views: number }[]
  viewsByDevice: { device: string; views: number }[]
  timeline: { date: string; views: number }[]
  topSections: { path: string; views: number }[]
  activeSponsors: number
  mostViewedTitle: string
}

const CARD: React.CSSProperties = {
  background: '#0a0a0a',
  border: '1px solid #333',
  borderRadius: '10px',
  padding: '1.5rem',
}

const TITLE: React.CSSProperties = {
  color: '#c61d4a',
  fontSize: '1.1rem',
  marginBottom: '0.75rem',
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/analytics-summary')
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(setData)
      .catch((err) => {
        console.error('Dashboard error:', err)
        setError('No se pudieron cargar los datos.')
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        <h1 style={{ color: '#c61d4a' }}>📊 Panel de Analytics</h1>
        <p style={{ color: '#888' }}>Cargando...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ color: '#c61d4a' }}>📊 Panel de Analytics</h1>
        <div style={{ ...CARD, textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#888' }}>{error || 'Sin datos disponibles.'}</p>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>
            Los datos aparecerán cuando los visitantes naveguen por el sitio.
          </p>
        </div>
      </div>
    )
  }

  const timeline = data.timeline.map((d) => ({ ...d, date: d.date.substring(5) }))

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#c61d4a', fontSize: '1.6rem', marginBottom: '1.5rem' }}>
        📊 Panel de Analytics
      </h1>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <KpiCard title="Visitas totales" value={data.totalViews.toLocaleString()} sub="Últimos 30 días" />
        <KpiCard title="Sesiones únicas" value={data.uniqueSessions.toLocaleString()} sub="Visitantes" />
        <KpiCard title="Sponsors activos" value={String(data.activeSponsors)} sub="Patrocinadores" />
        <KpiCard title="Más visto" value={data.mostViewedTitle} sub="Contenido estrella" small />
        <KpiCard title="Rebote" value={`${data.bounceRate}%`} sub="Visitas < 10s" />
      </div>

      {/* Visitas por día */}
      <div style={{ ...CARD, marginBottom: '2rem' }}>
        <h2 style={TITLE}>📈 Visitas por día (últimos 30 días)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis dataKey="date" stroke="#666" fontSize={11} />
            <YAxis stroke="#666" fontSize={11} />
            <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '6px', color: '#f0f0f0' }} />
            <Line type="monotone" dataKey="views" stroke="#c61d4a" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top contenidos */}
      <div style={{ ...CARD, marginBottom: '2rem' }}>
        <h2 style={TITLE}>🏆 Contenidos más vistos</h2>
        <ResponsiveContainer width="100%" height={Math.max(250, data.topContent.length * 40)}>
          <BarChart data={data.topContent} layout="vertical" margin={{ left: 150, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#222" />
            <XAxis type="number" stroke="#666" fontSize={11} />
            <YAxis dataKey="title" type="category" stroke="#666" fontSize={11} width={140} />
            <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '6px', color: '#f0f0f0' }} />
            <Bar dataKey="views" radius={[0, 6, 6, 0]}>
              {data.topContent.map((entry, i) => (
                <rect key={i} fill={COLORS[entry.contentType] || '#c61d4a'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <div style={CARD}>
        <h2 style={TITLE}>📋 Contenidos — Detalle</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ccc', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0.75rem', color: '#888' }}>#</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#888' }}>Título</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#888' }}>Tipo</th>
                <th style={{ padding: '0.5rem 0.75rem', color: '#888', textAlign: 'right' }}>Vistas</th>
              </tr>
            </thead>
            <tbody>
              {data.topContent.map((item, idx) => (
                <tr key={item.slug} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '0.5rem 0.75rem', color: '#666' }}>{idx + 1}</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>{item.title}</td>
                  <td style={{ padding: '0.5rem 0.75rem' }}>
                    <span style={{ display: 'inline-block', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, background: COLORS[item.contentType] || '#555', color: '#fff' }}>
                      {typeLabel(item.contentType)}
                    </span>
                  </td>
                  <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 700, color: '#c61d4a' }}>{item.views.toLocaleString()}</td>
                </tr>
              ))}
              {data.topContent.length === 0 && (
                <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#555' }}>Sin datos aún</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ title, value, sub, small }: { title: string; value: string; sub: string; small?: boolean }) {
  return (
    <div style={CARD}>
      <p style={{ color: '#888', fontSize: '0.75rem', margin: '0 0 0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
      <p style={{ color: '#c61d4a', fontSize: small ? '0.9rem' : '1.5rem', fontWeight: 700, margin: '0 0 0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: small ? 'normal' : 'nowrap' }}>{value}</p>
      <p style={{ color: '#555', fontSize: '0.7rem', margin: 0 }}>{sub}</p>
    </div>
  )
}

function typeLabel(t: string): string {
  const m: Record<string, string> = { podcast: 'Podcast', video: 'Video', noticia: 'Noticia', servicio: 'Servicio', portafolio: 'Portafolio', 'en-vivo': 'En Vivo', otro: 'Otro' }
  return m[t] || t
}