'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    __tubesCursor: any
  }
}

export default function ParticleTrail() {
  useEffect(() => {
    const canvas = document.getElementById('tubes-canvas') as HTMLCanvasElement
    if (!canvas) return

    let app: any = null

    const script = document.createElement('script')
    script.type = 'module'
    script.textContent = `
    import TubesCursor from 'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js';
    const canvas = document.getElementById('tubes-canvas');
    if (canvas) {
      window.__tubesCursor = TubesCursor(canvas, {
        tubes: {
          colors: ['#c61d4a', '#ff643c', '#a855f7'],
          lights: {
            intensity: 200,
            colors: ['#c61d4a', '#fe8a2e', '#ff008a', '#60aed5']
          }
        }
      });
      if(window.__tubesCursor && window.__tubesCursor.renderer){
        window.__tubesCursor.renderer.setClearColor(0x000000,0)
      }
      window.__tubesCursor.renderer.domElement.style.background='transparent';
    }
  `
    document.head.appendChild(script)

    return () => {
      if (window.__tubesCursor && window.__tubesCursor.dispose) {
        window.__tubesCursor.dispose()
        window.__tubesCursor = null
      }
      if (script.parentNode) script.parentNode.removeChild(script)
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
        zIndex: 0,
        pointerEvents: 'none',
        background: 'transparent',
      }}
    />
  )
}
