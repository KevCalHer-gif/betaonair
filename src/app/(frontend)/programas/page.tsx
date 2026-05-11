'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPrograms } from '@/lib/api/programs'
import type { Program } from '@/payload-types'

export default function ProgramasPage() {
  const [programs, setPrograms] = useState<Program[]>([])

  useEffect(() => {
    getPrograms().then(setPrograms)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Programas</h1>
      {programs.length === 0 ? (
        <p>Cargando programas...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))' }}>
          {programs.map((prog) => (
            <div key={prog.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
              <h2>{prog.title}</h2>
              {prog.descripcionCorta && <p>{prog.descripcionCorta}</p>}
              {prog.slug && (
                <Link href={`/programas/${prog.slug}`} style={{ color: '#c61d4a', textDecoration: 'none' }}>
                  Ver más →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
