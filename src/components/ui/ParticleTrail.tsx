'use client'

import { useEffect, useRef } from 'react'

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = canvas.width = window.innerWidth
    let H = canvas.height = window.innerHeight
    let animId: number
    let mounted = true

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    const mouse = { x: W / 2, y: H / 2 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const COLORS = ['#c61d4a', '#a855f7', '#ff643c', '#2db7d1', '#ff008a']
    const TUBE_COUNT = 5

    interface Point { x: number; y: number }

    class Tube {
      points: Point[] = []
      color: string
      maxPoints: number
      targetX: number
      targetY: number
      currentX: number
      currentY: number
      speed: number
      width: number
      phase: number

      constructor(color: string, index: number) {
        this.color = color
        this.maxPoints = 60 + Math.floor(Math.random() * 40)
        this.targetX = W / 2
        this.targetY = H / 2
        this.currentX = W / 2 + (index - 2) * 80
        this.currentY = H / 2
        this.speed = 0.06 + index * 0.01
        this.width = 2 + index * 0.5
        this.phase = (index / TUBE_COUNT) * Math.PI * 2
      }

      update(tx: number, ty: number, time: number) {
        const offsetX = Math.sin(time * 0.8 + this.phase) * 30
        const offsetY = Math.cos(time * 0.6 + this.phase) * 20
        this.currentX += (tx + offsetX - this.currentX) * this.speed
        this.currentY += (ty + offsetY - this.currentY) * this.speed
        this.points.push({ x: this.currentX, y: this.currentY })
        if (this.points.length > this.maxPoints) this.points.shift()
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.points.length < 2) return
        for (let i = 1; i < this.points.length; i++) {
          const t = i / this.points.length
          const alpha = t * t * 0.8
          const lineWidth = this.width * t

          ctx.globalCompositeOperation = 'lighter'
          ctx.beginPath()
          ctx.moveTo(this.points[i - 1].x, this.points[i - 1].y)
          ctx.lineTo(this.points[i].x, this.points[i].y)
          ctx.strokeStyle = this.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = lineWidth
          ctx.lineCap = 'round'
          ctx.shadowBlur = 12 * t
          ctx.shadowColor = this.color
          ctx.stroke()
        }
        ctx.shadowBlur = 0
      }
    }

    const tubes = COLORS.map((color, i) => new Tube(color, i))

    let time = 0
    const render = () => {
      if (!mounted) return
      animId = requestAnimationFrame(render)
      time += 0.016

      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.fillRect(0, 0, W, H)

      tubes.forEach(tube => {
        tube.update(mouse.x, mouse.y, time)
        tube.draw(ctx)
      })
    }

    render()

    return () => {
      mounted = false
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'transparent',
      }}
    />
  )
}
