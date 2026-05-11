'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getProjects } from '@/lib/api/projects'
import type { Project } from '@/payload-types'

export default function PortafolioPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Portafolio</h1>
      {projects.length === 0 ? (
        <p>Cargando proyectos...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))' }}>
          {projects.map(project => (
            <div key={project.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
              <h2>{project.title}</h2>
              {project.cliente && <p><strong>Cliente:</strong> {project.cliente}</p>}
              {project.descripcionCorta && <p>{project.descripcionCorta}</p>}
              <Link href={`/portafolio/${project.slug}`} style={{ color: '#c61d4a', textDecoration: 'none' }}>
                Ver más →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
