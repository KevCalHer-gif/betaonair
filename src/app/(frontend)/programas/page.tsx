'use client'

import ProgramCard from '../../../components/ui/ProgramCard'

const programas = [
  { nombre: 'Beta Kids', logo: '/images/programas/beta-kids.png', slug: 'beta-kids', descripcion: 'El espacio de entretenimiento educativo para los más pequeños de la casa.' },
  { nombre: 'Piedra y Camino', logo: '/images/programas/piedra-y-camino.png', slug: 'piedra-y-camino', descripcion: 'Conversaciones profundas sobre cultura, historia y el camino de Bolivia.' },
  { nombre: 'The Bronta Time', logo: '/images/programas/the-bronta-time.png', slug: 'the-bronta-time', descripcion: 'El programa de entretenimiento y humor que no te puedes perder.' },
  { nombre: 'No Tan Calladitas', logo: '/images/programas/no-tan-calladitas.png', slug: 'no-tan-calladitas', descripcion: 'Las voces femeninas que rompen el silencio y generan conversación.' },
  { nombre: 'Yukast', logo: '/images/programas/yukast.png', slug: 'yukast', descripcion: 'El podcast boliviano que habla de todo lo que importa.' },
]

export default function ProgramasPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Nuestros Programas
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {programas.map((prog) => (
          <ProgramCard
            key={prog.slug}
            nombre={prog.nombre}
            logo={prog.logo}
            slug={prog.slug}
            descripcion={prog.descripcion}
          />
        ))}
      </div>
    </main>
  )
}
