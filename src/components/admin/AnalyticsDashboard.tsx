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

const ACCENT = '#c61d4a'

const CARD: React.CSSProperties = {
  background: '#0f0f0f',
  border: '1px solid #2a2a2a',
  borderLeft: `3px solid ${ACCENT}`,
  borderRadius: '14px',
  padding: '1.75rem',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.35)',
}

const SECTION_HEADER: React.CSSProperties = {
  color: '#e0e0e0',
  fontSize: '1rem',
  fontWeight: 600,
  marginBottom: '1rem',
  paddingBottom: '0.6rem',
  borderBottom: '1px solid #2a2a2a',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}

const TOOLTIP_STYLE: React.CSSProperties = {
  background: '#161616',
  border: '1px solid #3a3a3a',
  borderRadius: '8px',
  color: '#f0f0f0',
  boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
  fontSize: '0.8rem',
  padding: '8px 12px',
}

const KPI_CONTAINER: React.CSSProperties = {
  maxWidth: '1100px',
  margin: '0 auto',
  marginBottom: '2rem',
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
      <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
        <h1 style={{ color: ACCENT, fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Panel de Analytics</h1>
        <p style={{ color: '#777', animation: 'pulse 1.5s infinite' }}>Cargando métricas...</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: ACCENT, fontSize: '1.5rem', marginBottom: '1rem' }}>📊 Panel de Analytics</h1>
        <div style={{ ...CARD, borderLeft: `3px solid ${ACCENT}`, textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#999', fontSize: '1rem' }}>{error || 'Sin datos disponibles.'}</p>
          <p style={{ color: '#555', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Los datos aparecerán cuando los visitantes naveguen por el sitio.
          </p>
        </div>
      </div>
    )
  }

  const timeline = data.timeline.map((d) => ({ ...d, date: d.date.substring(5) }))

  return (
    <div style={{ padding: '2.5rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        color: ACCENT,
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '2rem',
        textAlign: 'center',
      }}>
        📊 Panel de Analytics
      </h1>

      {/* KPI Cards */}
      <div style={KPI_CONTAINER}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '1rem',
        }}>
          <KpiCard icon="👁️" title="Visitas totales" value={data.totalViews.toLocaleString()} sub="Últimos 30 días" />
          <KpiCard icon="👤" title="Sesiones únicas" value={data.uniqueSessions.toLocaleString()} sub="Visitantes" />
          <KpiCard icon="🤝" title="Sponsors activos" value={String(data.activeSponsors)} sub="Patrocinadores" />
          <KpiCard icon="⭐" title="Más visto" value={data.mostViewedTitle} sub="Contenido estrella" small />
          <KpiCard icon="📉" title="Tasa de rebote" value={`${data.bounceRate}%`} sub="Visitas &lt; 10s" />
        </div>
      </div>

      {/* Visitas por día */}
      <div style={{ ...CARD, marginBottom: '2rem' }}>
        <h2 style={SECTION_HEADER}>📈 Visitas por día (últimos 30 días)</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis dataKey="date" stroke="#555" fontSize={11} />
            <YAxis stroke="#555" fontSize={11} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="views" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 3, fill: ACCENT }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top contenidos */}
      <div style={{ ...CARD, marginBottom: '2rem' }}>
        <h2 style={SECTION_HEADER}>🏆 Contenidos más vistos</h2>
        <ResponsiveContainer width="100%" height={Math.max(280, data.topContent.length * 42)}>
          <BarChart data={data.topContent} layout="vertical" margin={{ left: 160, right: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
            <XAxis type="number" stroke="#555" fontSize={11} />
            <YAxis dataKey="title" type="category" stroke="#555" fontSize={11} width={150} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="views" radius={[0, 6, 6, 0]}>
              {data.topContent.map((entry, i) => (
                <rect key={i} fill={COLORS[entry.contentType] || ACCENT} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla */}
      <div style={CARD}>
        <h2 style={SECTION_HEADER}>📋 Contenidos — Detalle</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            color: '#ccc',
            fontSize: '0.85rem',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #2a2a2a', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem 0.75rem', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>#</th>
                <th style={{ padding: '0.6rem 0.75rem', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Título</th>
                <th style={{ padding: '0.6rem 0.75rem', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</th>
                <th style={{ padding: '0.6rem 0.75rem', color: '#888', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Vistas</th>
              </tr>
            </thead>
            <tbody>
              {data.topContent.map((item, idx) => (
                <tr
                  key={item.slug}
                  style={{
                    borderBottom: '1px solid #1a1a1a',
                    background: idx % 2 === 0 ? 'transparent' : '#0c0c0c',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a' }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = idx % 2 === 0 ? 'transparent' : '#0c0c0c'
                  }}
                >
                  <td style={{ padding: '0.6rem 0.75rem', color: '#555', fontWeight: 600 }}>{idx + 1}</td>
                  <td style={{ padding: '0.6rem 0.75rem', fontWeight: 500 }}>{item.title}</td>
                  <td style={{ padding: '0.6rem 0.75rem' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      background: COLORS[item.contentType] || '#555',
                      color: '#fff',
                    }}>
                      {typeLabel(item.contentType)}
                    </span>
                  </td>
                  <td style={{
                    padding: '0.6rem 0.75rem',
                    textAlign: 'right',
                    fontWeight: 700,
                    color: ACCENT,
                  }}>
                    {item.views.toLocaleString()}
                  </td>
                </tr>
              ))}
              {data.topContent.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: '2.5rem', textAlign: 'center', color: '#555' }}>
                    Sin datos aún
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KpiCard({ icon, title, value, sub, small }: {
  icon: string
  title: string
  value: string
  sub: string
  small?: boolean
}) {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #111111, #0a0a0a)',
      border: '1px solid #2a2a2a',
      borderRadius: '14px',
      padding: '1.35rem 1.25rem',
      textAlign: 'center',
      boxShadow: '0 3px 16px rgba(0, 0, 0, 0.3)',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      cursor: 'default',
    }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#3a3a3a'
        el.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.45)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = '#2a2a2a'
        el.style.boxShadow = '0 3px 16px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ fontSize: '1.3rem', marginBottom: '0.35rem', lineHeight: 1 }}>{icon}</div>
      <p style={{
        color: '#999',
        fontSize: '0.7rem',
        margin: '0 0 0.3rem',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 500,
      }}>
        {title}
      </p>
      <p style={{
        color: ACCENT,
        fontSize: small ? '0.85rem' : '1.55rem',
        fontWeight: 700,
        margin: '0 0 0.25rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: small ? 'normal' : 'nowrap',
        lineHeight: 1.2,
      }}>
        {value}
      </p>
      <p style={{ color: '#555', fontSize: '0.68rem', margin: 0 }}>{sub}</p>
    </div>
  )
}

function typeLabel(t: string): string {
  const m: Record<string, string> = {
    podcast: 'Podcast',
    video: 'Video',
    noticia: 'Noticia',
    servicio: 'Servicio',
    portafolio: 'Portafolio',
    'en-vivo': 'En Vivo',
    otro: 'Otro',
  }
  return m[t] || t
}
