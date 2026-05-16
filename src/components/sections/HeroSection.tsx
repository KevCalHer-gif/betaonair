'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' },
})

type StickerState = {
  top: number
  left: number
  opacity: number
  shaking: boolean
  visible: boolean
}

const STICKER_DATA = [
  { src: '/recurso-13.png', alt: 'Rayo', width: 90, height: 90 },
  { src: '/recurso-19.png', alt: 'YIIAAA', width: 120, height: 120 },
  { src: '/recurso-12.png', alt: 'Awesome', width: 100, height: 100 },
  { src: '/recurso-18.png', alt: 'Sticker 1', width: 90, height: 90 },
  { src: '/recurso-24.png', alt: 'Sticker 2', width: 90, height: 90 },
  { src: '/recurso-10.png', alt: 'Sticker 3', width: 90, height: 90 },
  { src: '/recurso-14.png', alt: 'Sticker 4', width: 90, height: 90 },
  { src: '/recurso-11.png', alt: 'Sticker 5', width: 90, height: 90 },
  { src: '/recurso-16.png', alt: 'Sticker 6', width: 90, height: 90 },
  { src: '/recurso-17.png', alt: 'Sticker 7', width: 90, height: 90 },
  { src: '/recurso-09.png', alt: 'Sticker 8', width: 90, height: 90 },
]

const NUM_STICKERS = STICKER_DATA.length
const ZONE_WIDTH_VW = (90 - 5) / NUM_STICKERS

function getZoneLeftVw(zoneIndex: number): number {
  const zoneStart = 5 + zoneIndex * ZONE_WIDTH_VW
  return zoneStart + Math.random() * ZONE_WIDTH_VW * 0.7
}

function randomTopVh(): number {
  return 5 + Math.random() * 85
}

export default function HeroSection() {
  const [stickers, setStickers] = useState<StickerState[]>(
    STICKER_DATA.map((_, i) => ({
      top: 5,
      left: getZoneLeftVw(i),
      opacity: 0.21,
      shaking: false,
      visible: true,
    })),
  )

  const runCycle = useCallback((index: number) => {
    const delay = index * 1200 // 1.2s apart

    const tick = () => {
      setStickers((prev) => {
        const next = [...prev]
        next[index] = {
          ...next[index],
          visible: true,
          opacity: 0.21,
          top: randomTopVh(),
          left: getZoneLeftVw(index),
          shaking: false,
        }
        return next
      })

      // idle 500ms
      setTimeout(() => {
        setStickers((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], shaking: true }
          return next
        })

        // shake 930ms
        setTimeout(() => {
          setStickers((prev) => {
            const next = [...prev]
            next[index] = { ...next[index], shaking: false }
            return next
          })

          // quiet 500ms
          setTimeout(() => {
            setStickers((prev) => {
              const next = [...prev]
              next[index] = { ...next[index], opacity: 0 }
              return next
            })

            // reposition 500ms (total 1s after shake end)
            setTimeout(() => {
              setStickers((prev) => {
                const next = [...prev]
                next[index] = {
                  ...next[index],
                  visible: false,
                  top: randomTopVh(),
                  left: getZoneLeftVw(index),
                }
                return next
              })
              // restart after short pause
              setTimeout(tick, 200)
            }, 500)
          }, 500) // quiet
        }, 930) // shake
      }, 500) // idle
    }

    setTimeout(tick, delay)
  }, [])

  useEffect(() => {
    STICKER_DATA.forEach((_, idx) => runCycle(idx))
  }, [runCycle])

  return (
    <>
      {/* Fixed container for stickers covering full viewport */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
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
              top: `${stickers[idx].top}vh`,
              left: `${stickers[idx].left}vw`,
              opacity: stickers[idx].opacity,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            className={stickers[idx].shaking ? 'sticker-shake' : 'sticker-base'}
            loading={idx === 0 ? 'eager' : undefined}
          />
        ))}
      </div>
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
    </>
  )
}
