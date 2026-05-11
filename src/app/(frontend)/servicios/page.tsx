'use client'

import { useEffect, useState } from 'react'
import { getServices } from '@/lib/api/services'
import type { Service } from '@/payload-types'

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Servicios</h1>
      {services.length === 0 ? (
        <p>Cargando servicios...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))' }}>
          {services.filter(s => s.activo !== false).map((s) => (
            <div key={s.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
              <h2>{s.title}</h2>
              {s.descripcionCorta && <p>{s.descripcionCorta}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
