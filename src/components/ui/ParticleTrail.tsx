'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import CustomCursor from './CustomCursor'

/* ── Palette ── */
const COLORS = [
  '#c61d4a', '#e63946', '#ff643c', '#ff9500',
  '#ffcc02', '#64dc50', '#06d6a0', '#2db7d1',
  '#5064f0', '#a855f7', '#ec4899', '#ff3c78',
]

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff]
}

function lerpColor(
  from: [number, number, number],
  to: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(from[0] + (to[0] - from[0]) * t),
    Math.round(from[1] + (to[1] - from[1]) * t),
    Math.round(from[2] + (to[2] - from[2]) * t),
  ]
}

function rgbStr(rgb: [number, number, number]): string {
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}

/* ── Particle type ── */
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  r: number
  g: number
  b: number
}

/* ── Props ── */
interface ParticleTrailProps {
  className?: string
}

export default function ParticleTrail({ className }: ParticleTrailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animIdRef = useRef<number>(0)

  /* color state for cursor */
  const [cursorPos, setCursorPos] = useState({ x: -9999, y: -9999 })
  const [cursorColor, setCursorColor] = useState('#c61d4a')

  /* cycle color logic */
  const cycleRef = useRef({
    index: 0,
    t: 0,
    lastTime: 0,
    from: hexToRgb(COLORS[0]),
    to: hexToRgb(COLORS[1]),
  })

  const updateColor = useCallback((now: number) => {
    const c = cycleRef.current
    const elapsed = now - c.lastTime
    c.t += elapsed * 0.0005 // move through 2s cycle

    if (c.t >= 1) {
      c.t = 0
      c.index = (c.index + 1) % COLORS.length
      c.from = hexToRgb(COLORS[c.index])
      c.to = hexToRgb(COLORS[(c.index + 1) % COLORS.length])
    }
    c.lastTime = now

    const current = lerpColor(c.from, c.to, c.t)
    return rgbStr(current)
  }, [])

  /* spawn one particle */
  const spawn = useCallback(
    (x: number, y: number, speed: number, color: [number, number, number]) => {
      const maxLife = Math.floor(Math.random() * 41) + 30
      const sizeBase = Math.random() * 3.5 + 1
      const size = (sizeBase + speed * 0.15) * 1.3
      const angle = Math.random() * Math.PI * 2
      const vel = (Math.random() * 2 + 0.5) * 0.5
      const p: Particle = {
        x,
        y,
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel,
        life: maxLife,
        maxLife,
        size,
        r: color[0],
        g: color[1],
        b: color[2],
      }
      particlesRef.current.push(p)
      if (particlesRef.current.length > 450) {
        particlesRef.current.shift()
      }
    },
    [],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas!.width = w
      canvas!.height = h
    }
    resize()
    window.addEventListener('resize', resize)

    /* mouse move */
    const onMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current
      const dx = e.clientX - m.prevX
      const dy = e.clientY - m.prevY
      m.speed = Math.min(6, Math.sqrt(dx * dx + dy * dy))
      m.x = e.clientX
      m.y = e.clientY
      m.prevX = e.clientX
      m.prevY = e.clientY

      /* update cursor position (for component) */
      setCursorPos({ x: e.clientX, y: e.clientY })

      /* spawn based on speed */
      const colorArray = cycleRef.current
      const col = lerpColor(colorArray.from, colorArray.to, colorArray.t)
      const count = Math.ceil(m.speed)
      for (let i = 0; i < count; i++) {
        spawn(e.clientX, e.clientY, m.speed, col)
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    /* periodic spawn while mouse active */
    const interval = setInterval(() => {
      const m = mouseRef.current
      if (m.speed > 0.1) {
        const colorArray = cycleRef.current
        const col = lerpColor(colorArray.from, colorArray.to, colorArray.t)
        spawn(m.x, m.y, m.speed, col)
        // reduce speed gradually
        m.speed *= 0.9
      }
    }, 40)

    /* animation loop */
    const loop = (time: number) => {
      const colorStr = updateColor(time)
      setCursorColor(colorStr)

      if (ctx) {
        // fade
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = 'rgba(0,0,0,0.18)'
        ctx.fillRect(0, 0, w, h)

        // draw particles additive
        ctx.globalCompositeOperation = 'lighter'
        const particles = particlesRef.current
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.x += p.vx
          p.y += p.vy
          p.life -= 1

          if (p.life <= 0) {
            particles.splice(i, 1)
            continue
          }

          const t = p.life / p.maxLife
          const opacity = t * t * 0.55
          const radius = p.size * 2.86

          // inner core brighter
          const rInner = Math.min(255, p.r + 60)
          const gInner = Math.min(255, p.g + 40)
          const bInner = Math.min(255, p.b + 40)

          // outer color same as original but transparent
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, radius,
          )
          gradient.addColorStop(0, `rgba(${rInner},${gInner},${bInner},${opacity})`)
          gradient.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      animIdRef.current = requestAnimationFrame(loop)
    }
    animIdRef.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      clearInterval(interval)
      cancelAnimationFrame(animIdRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spawn, updateColor])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <CustomCursor x={cursorPos.x} y={cursorPos.y} color={cursorColor} />
    </>
  )
}
