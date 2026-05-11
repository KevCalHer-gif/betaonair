'use client'

import { useEffect, useState } from 'react'
import { getProjects } from '../../../lib/api/projects'
import type { Project } from '../../../payload-types'

export default function PortafolioPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Portafolio</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.5rem' }}>
        {projects.map((p) => (
          <div key={p.id} style={{ border: '1px solid #333', padding: '1rem' }}>
            <h2>{p.title}</h2>
            {p.cliente && <p style={{ color: '#aaa' }}>Cliente: {p.cliente}</p>}
            {p.descripcionCorta && <p>{p.descripcionCorta}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
