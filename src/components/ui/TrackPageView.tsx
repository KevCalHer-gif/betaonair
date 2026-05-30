'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

function getDeviceType(): string {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent.toLowerCase()
  if (/tablet|ipad|playbook|silk/.test(ua)) return 'tablet'
  if (/mobi|android|iphone|ipod|blackberry|opera mini|iemobile/.test(ua)) return 'mobile'
  return 'desktop'
}

function getContentType(pathname: string): string {
  if (pathname.startsWith('/programas/')) return 'podcast'
  if (pathname.startsWith('/en-vivo')) return 'en-vivo'
  if (pathname.startsWith('/noticias/')) return 'noticia'
  if (pathname.startsWith('/servicios/')) return 'servicio'
  if (pathname.startsWith('/portafolio')) return 'portafolio'
  if (pathname === '/') return 'otro'
  return 'otro'
}

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem('ba_sid')
    if (!sid) {
      sid = 's_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8)
      sessionStorage.setItem('ba_sid', sid)
    }
    return sid
  } catch {
    return 's_' + Date.now().toString(36)
  }
}

export default function TrackPageView() {
  const pathname = usePathname()
  const startRef = useRef(Date.now())
  const lastRef = useRef('')

  useEffect(() => {
    if (lastRef.current === pathname) return
    lastRef.current = pathname

    const contentType = getContentType(pathname)
    const sessionId = getSessionId()
    const device = getDeviceType()
    const ref = typeof document !== 'undefined' ? document.referrer : ''

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pathname, contentType, sessionId, device, referrer: ref }),
    }).catch(() => {})

    const prev = startRef.current
    startRef.current = Date.now()

    return () => {
      const dur = Math.round((Date.now() - prev) / 1000)
      if (dur > 0 && dur < 7200) {
        navigator.sendBeacon?.('/api/track', JSON.stringify({ path: pathname, contentType, sessionId, device, duration: dur }))
      }
    }
  }, [pathname])

  return null
}