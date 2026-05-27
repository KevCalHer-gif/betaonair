import { NextRequest, NextResponse } from 'next/server'

/**
 * Endpoint público para registrar visitas a páginas (analytics interno).
 * POST /api/track
 * Body: { path: string, section?: string, program?: string, news?: string, service?: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { path, section, program, news, service } = body

    if (!path) {
      return NextResponse.json({ error: 'path es requerido' }, { status: 400 })
    }

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const res = await fetch(`${API_URL}/api/pageviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        section: section || 'other',
        program: program || undefined,
        news: news || undefined,
        service: service || undefined,
        timestamp: new Date().toISOString(),
      }),
    })

    if (!res.ok) {
      console.error('Error registrando page view:', await res.text())
      return NextResponse.json({ error: 'Error registrando visita' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error en /api/track:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
