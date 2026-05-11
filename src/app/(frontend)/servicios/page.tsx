'use client'

import { useEffect, useState } from 'react'
import { getServices } from '../../../lib/api/services'
import type { Service } from '../../../payload-types'

export default function ServiciosPage() {
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Servicios</h1>
      {services.map((s) => (
        <div key={s.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #333' }}>
          <h2>{s.title}</h2>
          {s.descripcion && <p>{s.descripcion}</p>}
        </div>
      ))}
    </div>
  )
}
