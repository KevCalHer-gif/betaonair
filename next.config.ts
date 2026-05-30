import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Security headers — aplicados a nivel de servidor HTTP
  async headers() {
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

    const CSP_FRONTEND = [
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.cdnfonts.com",
      "img-src 'self' data: https: https://pub-ce3251289ec246b49347b11e6ef829df.r2.dev",
      "frame-src https://www.youtube.com https://player.twitch.tv",
      "connect-src 'self' https://www.google-analytics.com https://betaonair.com",
      "font-src 'self' data: https://fonts.cdnfonts.com",
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')

    const STATIC_SECURITY_HEADERS = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ]

    return [
      {
        // Admin: CSP permisivo (unsafe-inline + unsafe-eval para Payload + Recharts)
        source: '/admin/:path*',
        headers: [
          ...STATIC_SECURITY_HEADERS,
          { key: 'Content-Security-Policy', value: CSP_ADMIN },
        ],
      },
      {
        // Frontend público: CSP estricto
        source: '/(.*)',
        headers: [
          ...STATIC_SECURITY_HEADERS,
          { key: 'Content-Security-Policy', value: CSP_FRONTEND },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
