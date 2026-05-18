import { programas } from '../../../lib/data/programas'
import Image from 'next/image'
import Link from 'next/link'
import styles from './portafolio.module.css'

export default function PortafolioPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Portafolio
      </h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Conocé nuestros programas más destacados de Beta On Air.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {programas.map((prog) => (
          <Link key={prog.slug} href={`/programas/${prog.slug}`} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
              <Image src={prog.logo} alt={prog.nombre} width={200} height={200} style={{ objectFit: 'contain', height: '120px', width: 'auto', marginBottom: '1rem' }} />
              <h3 style={{ color: '#c61d4a', fontSize: '1rem', marginBottom: '0.5rem' }}>{prog.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{prog.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
