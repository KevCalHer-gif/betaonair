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
 * Middleware de seguridad para betaonair — Rate limiting + CSP dinámico.
 * Headers de seguridad estáticos se configuran en next.config.ts (headers() nativa).
 *
 * Rate limiting:
 * - /admin/login:         5 req/min (block 15 min)
 * - /api/contacto POST:   3 req/min
 * - /api/forgot-password: 3 req/min
 * - Requests autenticados (payload-token cookie): SIN rate limiting
 *
 * CSP:
 * - /admin/*: permisivo (unsafe-inline + unsafe-eval para Payload + Recharts)
 * - resto: estricto (solo googletagmanager + youtube/twitch iframes)
 */

// ---------- CSP Policies ----------

const CSP_FRONTEND = [
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "frame-src https://www.youtube.com https://player.twitch.tv",
  "connect-src 'self' https://www.google-analytics.com",
  "font-src 'self' data:",
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const CSP_ADMIN = [
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "frame-src 'self' https://www.youtube.com https://player.twitch.tv",
  "connect-src 'self' https://www.google-analytics.com",
  "font-src 'self' data:",
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

// ---------- Helpers ----------

/** Obtiene IP real del cliente (soporta proxies como Hostinger Cloud Startup) */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIP = request.headers.get('x-real-ip')
  if (realIP) return realIP
  return '127.0.0.1'
}

/** Verifica si el request está autenticado (cookie de sesión de Payload) */
function isAuthenticated(request: NextRequest): boolean {
  return request.cookies.has('payload-token')
}

// ---------- Middleware ----------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdmin = pathname.startsWith('/admin')

  // --- CSP (dinámico: admin vs frontend) ---
  const response = NextResponse.rewrite(request.nextUrl)
  response.headers.set(
    'Content-Security-Policy',
    isAdmin ? CSP_ADMIN : CSP_FRONTEND,
  )

  // --- Rate limiting ---
  // Excluir todos los requests autenticados para no romper el panel admin
  if (isAuthenticated(request)) return response

  const ip = getClientIP(request)

  try {
    // /admin/login — fuerza bruta
    if (pathname === '/admin/login' || pathname.startsWith('/admin/login')) {
      await loginLimiter.consume(ip, 1)
    }

    // /api/contacto POST — anti-SPAM
    if (pathname === '/api/contacto' && request.method === 'POST') {
      await contactLimiter.consume(ip, 1)
    }

    // /api/forgot-password — anti-enumeración
    if (pathname === '/api/forgot-password' || pathname === '/api/users/forgot-password') {
      await forgotPasswordLimiter.consume(ip, 1)
    }

    // /api/track — abuso de analytics (60 req/min)
    if (pathname === '/api/track') {
      await trackLimiter.consume(ip, 1)
    }

    // /api/graphql — solo para requests públicos (30 req/min)
    if (pathname === '/api/graphql') {
      await graphqlPublicLimiter.consume(ip, 1)
    }

    // /api/[...slug] REST de Payload — solo público (100 req/min)
    if (pathname.startsWith('/api/') && pathname !== '/api/graphql' && pathname !== '/api/track') {
      await restPublicLimiter.consume(ip, 1)
    }

    // Límite general para todas las demás rutas (200 req/min)
    await generalLimiter.consume(ip, 1)
  } catch {
    // Rate limit exceeded → 429
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
      { status: 429 },
    )
  }

  return response
}

// ---------- Matcher ----------

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|woff2?|ttf|otf)).*)',
  ],
}