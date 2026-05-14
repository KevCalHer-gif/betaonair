'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getProgramBySlug } from '../../../../lib/api/programs'
import { getEpisodesByProgram } from '../../../../lib/api/episodes'

interface Program {
  id: number
  title: string
  description?: string | null
}

interface Episode {
  id: number
  title: string
  embedUrl?: string | null
}

export default function ProgramSlugPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [program, setProgram] = useState<Program | null>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    const load = async () => {
      setLoading(true)
      try {
        const fetchedProgram = await getProgramBySlug(slug)
        setProgram(fetchedProgram)
        if (fetchedProgram) {
          const episodesData = await getEpisodesByProgram(slug)
          setEpisodes(episodesData)
        }
      } catch (error) {
        console.error('Error loading program:', error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <p style={{ color: '#aaa' }}>Cargando programa…</p>
      </main>
    )
  }

  if (!program) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
        <p style={{ color: '#aaa' }}>Programa no encontrado.</p>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2rem',
          marginBottom: '1rem',
        }}
      >
        {program.title}
      </h1>
      {program.description && (
        <p style={{ color: '#888', fontSize: '1rem', marginBottom: '2rem' }}>
          {program.description}
        </p>
      )}

      <h2 style={{ color: '#f0f0f0', fontSize: '1.5rem', marginBottom: '1rem' }}>
        Episodios
      </h2>
      {episodes.length === 0 ? (
        <p style={{ color: '#888' }}>No hay episodios disponibles aún.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {episodes.map((ep) => (
            <li key={ep.id} style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#f0f0f0', margin: '0 0 0.5rem' }}>{ep.title}</h3>
              {ep.embedUrl ? (
                <iframe
                  src={ep.embedUrl}
                  title={ep.title}
                  width="100%"
                  height="315"
                  style={{ border: 'none', borderRadius: 8 }}
                  allowFullScreen
                />
              ) : (
                <p style={{ color: '#aaa' }}>Sin enlace de reproducción.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
