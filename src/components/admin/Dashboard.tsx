'use client'

import { useEffect, useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

// ─── Tipos ───────────────────────────────────────────────

interface CardData {
  label: string
  icon: string
  count: number
  path: string
}

interface StatsData {
  totalVisits: number
  todayVisits: number
  dailyVisits: { date: string; count: number }[]
  sectionStats: { name: string; count: number }[]
  topPages: { path: string; count: number }[]
}

const SECTION_COLORS: Record<string, string> = {
  home: '#c61d4a',
  programs: '#3b82f6',
  live: '#f97316',
  news: '#10b981',
  sponsorships: '#8b5cf6',
  services: '#ec4899',
  contact: '#facc15',
  other: '#6b7280',
}

const SECTION_LABELS: Record<string, string> = {
  home: 'Inicio',
  programs: 'Programas',
  live: 'En Vivo',
  news: 'Noticias',
  sponsorships: 'Patrocinios',
  services: 'Servicios',
  contact: 'Contacto',
  other: 'Otras',
}

// ─── Componente ───────────────────────────────────────────

export default function Dashboard() {
  const [cards, setCards] = useState<CardData[]>([
    { label: 'Noticias publicadas', icon: '📰', count: 0, path: '/api/news?limit=0' },
    { label: 'Programas activos', icon: '📺', count: 0, path: '/api/programs?limit=0' },
    { label: 'Episodios totales', icon: '🎙️', count: 0, path: '/api/episodes?limit=0' },
    { label: 'Mensajes contacto', icon: '✉️', count: 0, path: '/api/contacts?limit=0' },
    { label: 'Patrocinios activos', icon: '🤝', count: 0, path: '/api/sponsorships?limit=0' },
    { label: 'Transmisiones reg.', icon: '📡', count: 0, path: '/api/live?limit=0' },
  ])

  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Cargar contadores de colecciones
    const fetchCounts = async () => {
      const updated = await Promise.all(
        cards.map(async (card) => {
          try {
            const res = await fetch(card.path)
            if (!res.ok) throw new Error('Failed')
            const json = await res.json()
            return { ...card, count: json?.totalDocs ?? 0 }
          } catch {
            return { ...card, count: 0 }
          }
        }),
      )
      setCards(updated)
    }

    // Cargar métricas de visitas
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/track/stats?days=30')
        if (!res.ok) throw new Error('Failed')
        const data = await res.json()
        setStats(data)
      } catch (err) {
        setError('No se pudieron cargar las métricas de visitas.')
      }
    }

    Promise.all([fetchCounts(), fetchStats()]).finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#aaa', textAlign: 'center' }}>
        Cargando dashboard...
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1.5rem',
        background: '#111',
        color: '#f0f0f0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        minHeight: '100vh',
      }}
    >
      {/* ── Tarjetas de contadores ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: 8,
              padding: '1rem 1.25rem',
              textAlign: 'center',
              minWidth: 140,
              flex: '1 0 auto',
            }}
          >
            <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{card.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#c61d4a' }}>
              {card.count}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.25rem' }}>
              {card.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Métricas de visitas ── */}
      {error && (
        <div style={{ background: '#2a1a1a', border: '1px solid #c61d4a44', borderRadius: 8, padding: '1rem', color: '#f87171' }}>
          {error}
        </div>
      )}

      {stats && stats.totalVisits > 0 && (
        <>
          {/* Big numbers */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              border: '1px solid #c61d4a44',
              borderRadius: 10,
              padding: '1.25rem 2rem',
              flex: 1,
              minWidth: 180,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                Visitas hoy
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#c61d4a' }}>
                {stats.todayVisits}
              </div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
              border: '1px solid #3b82f644',
              borderRadius: 10,
              padding: '1.25rem 2rem',
              flex: 1,
              minWidth: 180,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                Visitas (30 días)
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#3b82f6' }}>
                {stats.totalVisits}
              </div>
            </div>
          </div>

          {/* Línea: Visitas por día */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 8,
            padding: '1.25rem',
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#ccc' }}>📈 Visitas diarias (últimos 30 días)</h3>
            {stats.dailyVisits.length > 0 ? (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={stats.dailyVisits}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                  <XAxis dataKey="date" stroke="#666" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#666" allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#f0f0f0' }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#c61d4a" strokeWidth={2} dot={{ r: 3 }} name="Visitas" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p style={{ color: '#666', fontSize: '0.85rem' }}>Sin datos aún.</p>
            )}
          </div>

          {/* Dos gráficos lado a lado */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Barras: Visitas por sección */}
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: 8,
              padding: '1.25rem',
            }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#ccc' }}>📊 Visitas por sección</h3>
              {stats.sectionStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={stats.sectionStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="name" stroke="#666" tick={{ fontSize: 11 }} tickFormatter={(v: any) => SECTION_LABELS[v] || v} />
                    <YAxis stroke="#666" allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#f0f0f0' }}
                      labelFormatter={(v: any) => SECTION_LABELS[v] || v}
                    />
                    <Bar dataKey="count" fill="#c61d4a" radius={[4, 4, 0, 0]} name="Visitas" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#666', fontSize: '0.85rem' }}>Sin datos aún.</p>
              )}
            </div>

            {/* Torta: Distribución por sección */}
            <div style={{
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: 8,
              padding: '1.25rem',
            }}>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#ccc' }}>🍩 Distribución</h3>
              {stats.sectionStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={stats.sectionStats}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      innerRadius={40}
                      paddingAngle={2}
                      label={(props: any) => SECTION_LABELS[props.name] || props.name}
                    >
                      {stats.sectionStats.map((entry, idx) => (
                        <Cell key={idx} fill={SECTION_COLORS[entry.name] || '#6b7280'} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: 6, color: '#f0f0f0' }}
                      labelFormatter={(v: any) => SECTION_LABELS[v] || v}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p style={{ color: '#666', fontSize: '0.85rem' }}>Sin datos aún.</p>
              )}
            </div>
          </div>

          {/* Top 10 páginas */}
          <div style={{
            background: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: 8,
            padding: '1.25rem',
          }}>
            <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#ccc' }}>🏆 Top 10 páginas más visitadas</h3>
            {stats.topPages.length > 0 ? (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #333' }}>
                    <th style={{ textAlign: 'left', padding: '0.5rem', color: '#888', fontSize: '0.8rem' }}>#</th>
                    <th style={{ textAlign: 'left', padding: '0.5rem', color: '#888', fontSize: '0.8rem' }}>Página</th>
                    <th style={{ textAlign: 'right', padding: '0.5rem', color: '#888', fontSize: '0.8rem' }}>Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topPages.map((page, idx) => (
                    <tr key={page.path} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.5rem', color: '#666', fontSize: '0.85rem' }}>{idx + 1}</td>
                      <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>{page.path}</td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 'bold', color: '#c61d4a' }}>{page.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#666', fontSize: '0.85rem' }}>Sin datos aún.</p>
            )}
          </div>
        </>
      )}

      {stats && stats.totalVisits === 0 && (
        <div style={{
          background: '#1a1a1a',
          border: '1px solid #2a2a2a',
          borderRadius: 8,
          padding: '2rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <p>Aún no hay datos de visitas. Las métricas aparecerán cuando los visitantes empiecen a navegar el sitio.</p>
        </div>
      )}
    </div>
  )
}
