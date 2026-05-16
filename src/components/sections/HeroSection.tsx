'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div {...fadeUp(0)} style={{ zIndex: 10, position: 'relative' }}>
        <Image
          src="/logo.png"
          alt="Beta On Air"
          width={192}
          height={288}
          priority
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      <motion.h1
        {...fadeUp(0.2)}
        style={{
          fontFamily: 'var(--font-brand)',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          color: '#fff',
          marginTop: '1rem',
          textAlign: 'center',
        }}
      >
        Hacemos que se note.
      </motion.h1>

      <motion.div {...fadeUp(0.4)}>
        <a
          href="#contenido"
          style={{
            display: 'inline-block',
            backgroundColor: '#c61d4a',
            color: '#fff',
            padding: '0.75rem 2rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            marginTop: '1.5rem',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0205a')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#c61d4a')}
        >
          Ver nuestro trabajo
        </a>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        {...fadeUp(0.6)}
        style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: '#888',
        }}
      >
        <span style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>SCROLL</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
