# Plan — SMTP (Resend) + Google Analytics

## Fase A — Fixes pendientes (ya codeados, solo build + commit)

- [x] `episodes.ts`: `revalidate: 3600` → `cache: 'no-store'`
- [x] `programas/[slug]/page.tsx`: agregado `export const dynamic = 'force-dynamic'`
- [x] `page.tsx` (homepage): iframe Live con `?autoplay=1&mute=1` + `allow="autoplay; fullscreen"`
- [x] `en-vivo/page.tsx`: iframe Live con `?autoplay=1&mute=1` + `allow="autoplay; fullscreen"`
- [x] `Users.ts`: `read` del admin ahora filtra `{ role: { not_equals: 'superadmin' } }`

## Fase B — SMTP con Resend

### Archivos a modificar:
1. **`package.json`** — instalar `@payloadcms/email-resend`
2. **`.env.example`** — agregar `RESEND_API_KEY=`
3. **`.env`** — agregar variable real (usuario debe poner su API key de resend.com)
4. **`payload.config.ts`** — agregar bloque `email` con `resendAdapter`

### Código en `payload.config.ts`:
```ts
import { resendAdapter } from '@payloadcms/email-resend'

// dentro de buildConfig:
email: resendAdapter({
  defaultFromAddress: 'no-reply@betaonair.com',
  defaultFromName: 'Beta On Air',
  apiKey: process.env.RESEND_API_KEY || '',
}),
```

### Verificación:
- Ir a `/admin/login` → click "Forgot password?"
- Ingresar email de un usuario existente
- Verificar que llega el email con link de reset
- Clickear link → poner nueva contraseña → iniciar sesión

## Fase C — Google Analytics (GA4)

### Archivos a modificar:
1. **`.env.example`** — agregar `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
2. **`.env`** — agregar Measurement ID real
3. **`layout.tsx`** — agregar scripts de GA4 en `<head>`

### Código en `layout.tsx`:
```tsx
// Google Analytics
const gaId = process.env.NEXT_PUBLIC_GA_ID

// en <head>:
{gaId && (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    <script dangerouslySetInnerHTML={{
      __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`
    }} />
  </>
)}
```

### Métricas que GA4 da gratis:
- Páginas más visitadas (/programas, /en-vivo, /noticias, etc.)
- Usuarios activos en tiempo real
- Ubicación geográfica de viewers
- Dispositivos (móvil vs desktop)
- Tiempo promedio en el sitio
- Fuentes de tráfico (redes sociales, búsqueda, directo)

## Orden de ejecución

1. Build + commit de los 5 fixes ya codeados
2. Instalar `@payloadcms/email-resend`
3. Configurar `payload.config.ts` con el adapter
4. Agregar variables de entorno (`.env.example` + instrucciones)
5. Agregar Google Analytics en `layout.tsx`
6. Build final + commit
