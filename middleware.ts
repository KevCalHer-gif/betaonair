import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  loginLimiter,
  contactLimiter,
  forgotPasswordLimiter,
  trackLimiter,
  graphqlPublicLimiter,
  restPublicLimiter,
  generalLimiter,
} from './src/lib/rate-limit'

/**
 * Middleware de seguridad para betaonair — Rate limiting.
 * Headers de seguridad + CSP se configuran en next.config.ts (headers() nativa).
 *
 * Rate limiting:
 * - /admin/login:         5 req/min (block 15 min)
 * - /api/contacto POST:   3 req/min
 * - /api/forgot-password: 3 req/min
 * - /api/track:           60 req/min
 * - /api/graphql (público): 30 req/min
 * - /api/* REST (público): 100 req/min
 * - General:              200 req/min
 * - Requests autenticados (payload-token cookie): SIN rate limiting
 */

// ---------- Helpers ----------

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP
  return '127.0.0.1'
}

function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('payload-token')
}

// ---------- Middleware ----------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Requests autenticados pasan sin rate limiting
  if (isAuthenticated(request)) return NextResponse.next()

  const ip = getClientIP(request)

  try {
    if (pathname.startsWith('/admin/login')) {
      await loginLimiter.consume(ip, 1)
    } else if (pathname === '/api/contacto' && request.method === 'POST') {
      await contactLimiter.consume(ip, 1)
    } else if (pathname === '/api/forgot-password' || pathname === '/api/users/forgot-password') {
      await forgotPasswordLimiter.consume(ip, 1)
    } else if (pathname === '/api/track') {
      await trackLimiter.consume(ip, 1)
    } else if (pathname === '/api/graphql') {
      await graphqlPublicLimiter.consume(ip, 1)
    } else if (pathname.startsWith('/api/') && pathname !== '/api/graphql' && pathname !== '/api/track') {
      await restPublicLimiter.consume(ip, 1)
    } else {
      await generalLimiter.consume(ip, 1)
    }
  } catch {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
      { status: 429 },
    )
  }

  return NextResponse.next()
}

// ---------- Matcher ----------

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|woff2?|ttf|otf)).*)',
  ],
}