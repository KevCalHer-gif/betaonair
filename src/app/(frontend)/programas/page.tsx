import ProgramCard from '../../../components/sections/ProgramCard'
import { getPrograms } from '../../../lib/api/programs'

export const dynamic = 'force-dynamic'

export default async function ProgramasPage() {
  const programas = await getPrograms()

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Nuestros Programas
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {programas.map((prog) => {
          const logoUrl = (prog.logo as any)?.sizes?.program_logo?.url || (prog.logo as any)?.url || ''
          return (
            <div key={prog.slug} className="card-programa fade-in-up" style={{ display: 'flex' }}>
              <ProgramCard
                nombre={prog.title}
                logo={logoUrl}
                slug={prog.slug || ''}
                descripcion={prog.description || ''}
              />
            </div>
          )
        })}
      </div>
    </main>
  )
}
