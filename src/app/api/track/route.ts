import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      path,
      contentType = 'otro',
      contentSlug = '',
      contentTitle = '',
      sessionId = '',
      device = 'desktop',
      referrer = '',
      duration = 0,
    } = body || {}

    if (!path) {
      return NextResponse.json({ ok: false, error: 'path is required' }, { status: 400 })
    }

    const country =
      request.headers.get('cf-ipcountry') ||
      request.headers.get('x-vercel-ip-country') ||
      ''

    await fetch(`${API_URL}/api/pageviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        contentType,
        contentSlug,
        contentTitle,
        sessionId,
        device,
        country,
        referrer,
        duration,
        timestamp: new Date().toISOString(),
      }),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error tracking page view:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}