import { getPrograms } from '../../../lib/api/programs'
import Image from 'next/image'
import Link from 'next/link'
import styles from './portafolio.module.css'

export default async function PortafolioPage() {
  const programs = await getPrograms()

  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Portafolio
      </h1>
      <p
        style={{
          color: '#888',
          textAlign: 'center',
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem',
        }}
      >
        Conocé nuestros programas más destacados de Beta On Air.
      </p>
      {programs.length === 0 ? (
        <p style={{ color: '#555', textAlign: 'center', padding: '2rem 0', fontStyle: 'italic' }}>
          No hay programas registrados aún.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {programs.map((prog) => {
            const logo = prog.logo as
              | { url?: string; sizes?: { thumbnail?: { url?: string } } }
              | number
              | null
              | undefined
            const logoSrc =
              typeof logo === 'object' && logo !== null
                ? logo.sizes?.thumbnail?.url || logo.url || ''
                : ''

            return (
              <Link key={prog.slug} href={`/programas/${prog.slug}`} style={{ textDecoration: 'none' }}>
                <div className={styles.card}>
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt={prog.title}
                      width={200}
                      height={200}
                      style={{ objectFit: 'contain', height: '120px', width: 'auto', marginBottom: '1rem' }}
                    />
                  ) : (
                    <div
                      style={{
                        height: '120px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#555',
                        marginBottom: '1rem',
                      }}
                    >
                      Sin logo
                    </div>
                  )}
                  <h3 style={{ color: '#c61d4a', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {prog.title}
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{prog.description}</p>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
