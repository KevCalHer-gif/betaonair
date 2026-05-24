'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getLiveStreams } from '@/lib/api/live'
import { getPrograms } from '@/lib/api/programs'
import type { Live } from '@/payload-types'
import type { Program } from '@/payload-types'

export default function ServicesSection() {
  const [liveStreams, setLiveStreams] = useState<Live[]>([])
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    getLiveStreams().then(setLiveStreams)
    getPrograms().then(setPrograms)
  }, [])

  return (
    <section id="contenido" style={{ background: '#0a0a0a', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#fff',
            marginBottom: 3,
            textAlign: 'center',
          }}
        >
          En Vivo{' '}
          <span style={{ color: '#c61d4a' }}>y Podcast</span>
        </motion.h2>

        {liveStreams.length > 0 && (
          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ color: '#c61d4a' }}>Streaming en Vivo</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {liveStreams.map((live) => (
                <div
                  key={live.id}
                  style={{
                    border: '1px solid #333',
                    padding: '1rem',
                    minWidth: 200,
                    flex: '1 1 300px',
                  }}
                >
                  {live.title && <h4 style={{ color: '#fff' }}>{live.title}</h4>}
                  {live.embedUrl && (
                    <div
                      style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                      }}
                    >
                      <iframe
                        src={live.embedUrl}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0,
                        }}
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {programs.length > 0 && (
          <div style={{ margin: '2rem 0' }}>
            <h3 style={{ color: '#c61d4a' }}>Programas Propios</h3>
            <div
              style={{
                display: 'grid',
                gap: '1.5rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
              }}
            >
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  style={{
                    border: '1px solid #222',
                    padding: '1.5rem',
                    background: 'transparent',
                    transition: 'background 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#111'
                    e.currentTarget.style.borderColor = '#c61d4a'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = '#222'
                  }}
                >
                  <h4 style={{ color: '#c61d4a', marginBottom: '0.5rem' }}>
                    {prog.title}
                  </h4>
                  {prog.description && (
                    <p style={{ color: '#ccc' }}>{prog.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {liveStreams.length === 0 && programs.length === 0 && (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>
            Cargando contenidos...
          </p>
        )}
      </div>
    </section>
  )
}
