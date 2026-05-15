'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

type StickerState = {
  top: number
  left: number
  opacity: number
  shaking: boolean
  visible: boolean
}

function randomTop() {
  return 5 + Math.random() * 75 // 5% – 80%
}

function randomLeft() {
  return 5 + Math.random() * 80 // 5% – 85%
}

const STICKER_DATA = [
  {
    src: '/recuros-13.png',
    alt: 'Rayo',
    width: 90,
    height: 90,
    initialDelay: 0,
    zoneIndex: 0,
  },
  {
    src: '/recuros-19.png',
    alt: 'YIIAAA',
    width: 120,
    height: 120,
    initialDelay: 2000,
    zoneIndex: 1,
  },
  {
    src: '/recuros-12.png',
    alt: 'Awesome',
    width: 100,
    height: 100,
    initialDelay: 4000,
    zoneIndex: 2,
  },
]

function getZoneLeft(zoneIndex: number): number {
  // divide 5–85 into 3 zones
  const zoneWidth = 80 / 3
  const zoneStart = 5 + zoneIndex * zoneWidth
  return zoneStart + Math.random() * zoneWidth * 0.7
}

export default function HeroSection() {
  const [stickers, setStickers] = useState<StickerState[]>(
    STICKER_DATA.map((d) => ({
      top: 5,
      left: getZoneLeft(d.zoneIndex),
      opacity: 1,
      shaking: false,
      visible: true,
    })),
  )

  const runCycle = useCallback((index: number) => {
    const delay = STICKER_DATA[index].initialDelay
    const zone = STICKER_DATA[index].zoneIndex

    const tick = () => {
      setStickers((prev) => {
        const next = [...prev]
        next[index] = {
          ...next[index],
          visible: true,
          opacity: 1,
          top: getZoneLeft(zone),
          left: getZoneLeft(zone),
          shaking: false,
        }
        return next
      })

      // 1 second idle
      setTimeout(() => {
        // start shake
        setStickers((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], shaking: true }
          return next
        })
        // after 1.4s shake stops
        setTimeout(() => {
          setStickers((prev) => {
            const next = [...prev]
            next[index] = { ...next[index], shaking: false }
            return next
          })
          // 1 second quiet after shake
          setTimeout(() => {
            // fade out
            setStickers((prev) => {
              const next = [...prev]
              next[index] = { ...next[index], opacity: 0 }
              return next
            })
            // after fade, hide and reposition
            setTimeout(() => {
              setStickers((prev) => {
                const next = [...prev]
                next[index] = {
                  ...next[index],
                  visible: false,
                  top: getZoneLeft(zone),
                  left: getZoneLeft(zone),
                }
                return next
              })
              // restart cycle after short pause
              setTimeout(tick, 200)
            }, 400) // fade time
          }, 1000) // quiet 1s
        }, 1400) // shake duration
      }, 1000) // idle 1s
    }

    setTimeout(tick, delay)
  }, [])

  useEffect(() => {
    STICKER_DATA.forEach((_, idx) => runCycle(idx))
  }, [runCycle])

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
      {STICKER_DATA.map((data, idx) => (
        <Image
          key={data.alt}
          src={data.src}
          alt={data.alt}
          width={data.width}
          height={data.height}
          style={{
            position: 'absolute',
            top: `${stickers[idx].top}%`,
            left: `${stickers[idx].left}%`,
            opacity: stickers[idx].opacity,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 2,
          }}
          className={stickers[idx].shaking ? 'sticker-shake' : 'sticker-base'}
          loading={idx === 0 ? 'eager' : undefined}
        />
      ))}
      <motion.div {...fadeUp(0)}>
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
