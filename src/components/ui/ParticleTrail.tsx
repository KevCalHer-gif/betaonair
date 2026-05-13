'use client'

import { useEffect } from 'react'

export default function ParticleTrail() {
  useEffect(() => {
    const canvas = document.getElementById('tubes-canvas') as HTMLCanvasElement
    if (!canvas) return

    let app: any = null

    import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js' as any)
      .then((module) => {
        const TubesCursor = module.default
        app = TubesCursor(canvas, {
          tubes: {
            colors: ['#c61d4a', '#ff643c', '#a855f7'],
            lights: {
              intensity: 200,
              colors: ['#c61d4a', '#fe8a2e', '#ff008a', '#60aed5'],
            },
          },
        })
      })
      .catch((err) => console.error('Error loading TubesCursor:', err))

    return () => {
      if (app && app.dispose) app.dispose()
    }
  }, [])

  return (
    <canvas
      id="tubes-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  )
}
