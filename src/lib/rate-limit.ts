import { RateLimiterMemory } from 'rate-limiter-flexible'

/**
 * Rate limiters para rutas críticas del proyecto betaonair.
 * Todos usan almacenamiento in-memory (sin Redis, sin infraestructura externa).
 * Los contadores se reinician en cada deploy — suficiente para prevenir abuso automatizado.
 *
 * Límites definidos según análisis RED RANGER 2026-05-30:
 * - /admin/login:         5 intentos/min (fuerza bruta)
 * - /api/contacto POST:   3 req/min    (anti-SPAM)
 * - /api/forgot-password: 3 req/min    (anti-enumeración)
 * - /api/track:           60 req/min   (analytics, tráfico normal ~5-10/min por usuario)
 * - /api/graphql público: 30 req/min   (consultas sin autenticación)
 * - REST público:         100 req/min  (getPrograms, getNews, etc.)
 * - General:              200 req/min  (protección DDoS básica)
 */

export const loginLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
  blockDuration: 900, // 15 minutos de bloqueo tras exceder
})

export const contactLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
})

export const forgotPasswordLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
})

export const trackLimiter = new RateLimiterMemory({
  points: 60,
  duration: 60,
})

export const graphqlPublicLimiter = new RateLimiterMemory({
  points: 30,
  duration: 60,
})

export const restPublicLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
})

export const generalLimiter = new RateLimiterMemory({
  points: 200,
  duration: 60,
})