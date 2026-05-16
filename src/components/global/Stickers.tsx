'use client'

import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'

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

export default function Stickers() {
  const [mounted, setMounted] = useState(false)
  
  // Estado inicial estático para no romper el servidor de Next.js
  const [stickers, setStickers] = useState<StickerState[]>(
    STICKER_DATA.map(() => ({
      top: 0,
      left: 0,
      opacity: 0,
      shaking: false,
      visible: false,
    }))
  )

  const runCycle = useCallback((index: number) => {
    const delay = index * 1200

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

      setTimeout(() => {
        setStickers((prev) => {
          const next = [...prev]
          next[index] = { ...next[index], shaking: true }
          return next
        })

        setTimeout(() => {
          setStickers((prev) => {
            const next = [...prev]
            next[index] = { ...next[index], shaking: false }
            return next
          })

          setTimeout(() => {
            setStickers((prev) => {
              const next = [...prev]
              next[index] = { ...next[index], opacity: 0 }
              return next
            })

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
              setTimeout(tick, 200)
            }, 500)
          }, 500)
        }, 930)
      }, 500)
    }

    setTimeout(tick, delay)
  }, [])

  useEffect(() => {
    // Al montar en el cliente, inicializamos posiciones y disparamos la animación
    setMounted(true)
    setStickers(
      STICKER_DATA.map((_, i) => ({
        top: randomTopVh(),
        left: getZoneLeftVw(i),
        opacity: 0.21,
        shaking: false,
        visible: true,
      }))
    )
    STICKER_DATA.forEach((_, idx) => runCycle(idx))
  }, [runCycle])

  // Si no estamos en el cliente aún, no renderizamos nada para evitar el error de hidratación
  if (!mounted) return null

  return (
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
  )
}