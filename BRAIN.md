# BRAIN.md — betaonair
> Archivo de estado del proyecto. Leer completo al inicio de cada sesión.
> Actualizar obligatoriamente al cerrar cada sesión.
> Última actualización: 2026-06-02 (sesión SEO + Settings + OG Image + sitemap/robots)

## ⚡ SESIÓN 2026-06-02 — SEO, Settings, OG Image, Sitemap, Robots

**ESTADO: Fixes de SEO aplicados. Pendiente deploy y verificación en Google.**

---

### Análisis RED RANGER — Diagnóstico SEO

Se realizó análisis táctico completo de la configuración de Payload CMS, los globals Settings/SEO, el flujo de datos al frontend, y las variables de entorno.

**Archivos relevantes:**
| Archivo | Rol |
|---|---|
| `payload.config.ts` | Configuración central: PostgreSQL (Neon), R2 (S3), Resend (email), Sharp, 13 colecciones, 2 globals |
| `src/globals/Settings.ts` | 7 campos (siteName, slogan, logoUrl, redes sociales). Acceso: lectura pública, escritura superadmin |
| `src/globals/Seo.ts` | 3 campos (metaTitle, metaDescription, ogImage→media). Acceso: lectura pública, escritura superadmin |
| `src/lib/api/settings.ts` | `getSettings()` → `GET /api/globals/settings`, `getSeo()` → `GET /api/globals/seo`. Usa `fetch()` con `NEXT_PUBLIC_API_URL` |
| `src/app/(frontend)/layout.tsx` | `generateMetadata()` → title, description, og:image desde SEO/Settings |

**Problemas detectados:**
| # | Problema | Severidad |
|---|---|---|
| 1 | OG Image con URL relativa (`/api/media/file/...`) → no funciona en WhatsApp/Facebook | 🔴 Crítico |
| 2 | Sin `robots.txt` → Google no sabe qué indexar | 🟡 Alto |
| 3 | Sin `sitemap.xml` → indexación muy lenta | 🟡 Alto |
| 4 | `NEXT_PUBLIC_SITE_URL` podía quedar vacía → URLs relativas en sitemap/robots | 🟡 Alto |
| 5 | Caché de 3600s (1 hora) en getSettings/getSeo → cambios tardan mucho en reflejarse | 🟡 Medio |
| 6 | `logoUrl` es tipo `text` (no `upload`) → no se puede seleccionar de Media Library | 🟢 Mejorable |

---

### Fixes aplicados (LISANDRO)

**Fix #1 — `src/lib/api/settings.ts`:**
- `API_URL` ahora prioriza `NEXT_PUBLIC_SITE_URL` (fallback: `NEXT_PUBLIC_API_URL` → `localhost:3000`)
- Caché reducido: `3600` → `60` segundos
- Tags agregados: `['settings']` y `['seo']` para revalidación bajo demanda

**Fix #2 — `src/app/(frontend)/layout.tsx`:**
- `generateMetadata()`: OG Image ahora usa URL absoluta. Si `seo.ogImage.url` NO empieza con `http`, se prefija con `NEXT_PUBLIC_SITE_URL`

**Fix #3 — `src/app/robots.ts` (NUEVO):**
- Permite indexación total (`allow: '/'`)
- Sitemap con URL absoluta (fallback hardcodeado: `https://betaonair.com`)

**Fix #4 — `src/app/sitemap.ts` (NUEVO):**
- 8 rutas estáticas: `/`, `/programas`, `/en-vivo`, `/noticias`, `/patrocinios`, `/servicios`, `/portafolio`, `/contacto`
- Rutas dinámicas desde API: `programs`, `news`, `services` (con slug y updatedAt)
- Fallback hardcodeado: `https://betaonair.com` si `NEXT_PUBLIC_SITE_URL` no está definida
- Si la API falla, devuelve al menos las rutas estáticas

**Fix #5 — `.env`:**
- Ya tenía `NEXT_PUBLIC_SITE_URL=https://betaonair.com` (confirmado)

---

### Archivos modificados/creados esta sesión

| Archivo | Estado |
|---|---|
| `src/lib/api/settings.ts` | ✏️ Modificado (API_URL + caché + tags) |
| `src/app/robots.ts` | 🆕 Creado |
| `src/app/sitemap.ts` | 🆕 Creado |
| `src/app/(frontend)/layout.tsx` | ✏️ Modificado (OG Image absoluta) |
| `.env` | ✅ Ya tenía NEXT_PUBLIC_SITE_URL |

---

### Variables de entorno necesarias en producción (Vercel/Hostinger)

| Variable | Valor | Prioridad |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://betaonair.com` | 🔴 Crítica — OG Image, sitemap, robots |
| `NEXT_PUBLIC_API_URL` | `https://betaonair.com` | 🟡 Alta — fallback para fetch |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | 🟢 Media |
| `PAYLOAD_SECRET` | (tu secret) | 🔴 Crítica |
| `DATABASE_URI` | (Neon endpoint) | 🔴 Crítica |
| `RESEND_API_KEY` | `re_...` | 🟡 Alta |
| `R2_ENDPOINT` | (Cloudflare R2) | 🟡 Alta |
| `R2_ACCESS_KEY_ID` | (tu key) | 🟡 Alta |
| `R2_SECRET_ACCESS_KEY` | (tu secret) | 🟡 Alta |
| `R2_BUCKET_NAME` | `betaonair-media` | 🟡 Alta |

---

### Pendiente post-deploy

- [ ] **Google Search Console** → añadir dominio y subir `/sitemap.xml`
- [ ] **Facebook Sharing Debugger** → limpiar caché de OG Image
- [ ] Verificar que `NEXT_PUBLIC_SITE_URL` esté configurada en el panel de Hostinger
- [ ] `NEXT_PUBLIC_GA_ID` real de Google Analytics
- [ ] Upgrade Neon a plan Launch si se necesita eliminar cold starts

---

### No se tocó (sin cambios)

- `src/globals/Settings.ts` — intacto
- `src/globals/Seo.ts` — intacto
- `src/payload-types.ts` — intacto
- Base de datos — intacta

---

---

## 📦 SESIÓN DE PRODUCCIÓN — 2026-05-30

**ESTADO: EN PRODUCCIÓN** 🚀

### Base de datos — Neon PostgreSQL Serverless

Migración completada de PostgreSQL local a Neon. PostgreSQL local y Docker ya NO se usan para producción.

| Dato | Valor |
|------|-------|
| **Servicio** | Neon PostgreSQL Serverless |
| **Plan** | Free (posibilidad de upgrade a Launch para eliminar cold starts) |
| **Región** | AWS US East 1 (N. Virginia) |
| **Branch** | production |
| **PostgreSQL version** | 17 |
| **Endpoint** | Directo (sin pooling) — `?sslmode=require&channel_binding=require` |
| **Connection string** | `postgresql://neondb_owner:npg_***@ep-blue-paper-apxkcf89.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require` |
| **Migraciones ejecutadas** | `20260515_040342`, `20260530_041846` |
| **PostgreSQL local** | ❌ Desactivado |
| **Docker PostgreSQL** | ❌ Fuera de uso para producción |

---

### Hosting — Hostinger Cloud Startup

| Dato | Valor |
|------|-------|
| **Plataforma** | Hostinger Cloud Startup (managed, sin root, sin Docker, sin Nginx propio) |
| **Node.js** | 22.x |
| **Deploy** | Automático desde GitHub (rama `main`) — cada `git push` dispara un deploy |
| **SSL** | Gestionado automáticamente por Hostinger |
| **Dominio** | `betaonair.com` — activo y conectado |
| **WordPress** | Eliminado del hosting |

---

### Email transaccional — Resend

| Dato | Valor |
|------|-------|
| **Proveedor** | Resend |
| **Dominio verificado** | `betaonair.com` (región São Paulo) |
| **API Key** | Configurada en variables de entorno de Hostinger |

---

### Seguridad implementada

| Componente | Detalle | Archivo |
|-----------|--------|---------|
| **Rate limiting** | `rate-limiter-flexible` in-memory | `middleware.ts` |
| **Headers de seguridad** | X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | `next.config.ts` |
| **CSP admin** | `unsafe-inline` + `unsafe-eval` (Payload + Recharts) | `next.config.ts` |
| **CSP frontend** | Estricto con `unsafe-inline` para Next.js 16 Turbopack | `next.config.ts` |
| **PAYLOAD_SECRET** | Regenerado con `crypto.randomBytes(32)` | `.env.production` |

---

### Variables de entorno de producción

Configuradas en el panel de Hostinger (NO en el repo — `.env.production` está en `.gitignore`):

| Variable | Valor | Estado |
|----------|-------|--------|
| `DATABASE_URI` | Neon endpoint directo | ✅ Configurado |
| `PAYLOAD_SECRET` | Generado aleatoriamente | ✅ Configurado |
| `NEXT_PUBLIC_API_URL` | `https://betaonair.com` | ✅ Configurado |
| `RESEND_API_KEY` | API key real de Resend | ✅ Configurado |
| `NEXT_PUBLIC_GA_ID` | Pendiente | ⚠️ Placeholder |

---

### Pendiente para próximas sesiones

- [ ] `NEXT_PUBLIC_GA_ID` real de Google Analytics
- [ ] Upgrade Neon a plan Launch si se necesita eliminar cold starts (plan Free actual)
- [ ] Agregar `NEXT_PUBLIC_SITE_URL=https://betaonair.com` en Hostinger

---

---

---

## ANÁLISIS RED RANGER — 2026-05-13 (Plan de páginas /programas/[slug], /en-vivo, /contacto)

**ANÁLISIS:**
- Las colecciones `programs`, `episodes`, `live` y `contacts` ya existen en Payload y están configuradas con acceso apropiado.
- Las funciones `getPrograms`, `getProgram`, `getEpisodes`, `getLiveStreams` y `getContacts` están disponibles en `src/lib/api/`.
- No hay dependencias externas (no usa nuevos endpoints).
- La página `/programas/[slug]` debe usar `getProgram` y `getEpisodes` para mostrar detalle del programa y su lista de episodios.
- La página `/en-vivo` debe usar `getLiveStreams` para mostrar la transmisión activa; la colección `Live` soporta `isActive` y `embedUrl`.
- La página `/contacto` debe usar `getContacts`? No, la página de contacto debe guardar datos mediante la colección `Contacts` (no `getContacts`). La función `getContacts` solo lee, no escribe. Para enviar datos se necesita un Route Handler o el built-in de Payload (crear un contacto mediante POST). Se debe verificar si existe un endpoint de Payload que permita creación pública. La colección `contacts` tiene `access` con `create: ({ req: { user } }) => !!user`, lo que requiere autenticación. El formulario de contacto debe estar abierto a cualquier visitante. Por tanto, la configuración de acceso en `Contacts` debe permitir `create: () => true` para que cualquiera pueda enviar un mensaje. **Riesgo crítico**: Actualmente la colección `contacts` tiene `create: ({ req: { user } }) => !!user` lo que impide envío anónimo. Se debe modificar antes de construir la página de contacto.
- No hay conflictos con las rutas existentes.

**RIESGOS:**
1. Colección `contacts` bloquea envío anónimo (create: requiere usuario autenticado). Se debe cambiar a `create: () => true` antes de implementar el formulario.
2. Las funciones de API (`getLiveStreams`, `getPrograms`, etc.) devuelven promesas y deben manejarse correctamente con `useEffect` o `async` components.
3. Las páginas deben manejar estados de carga y error (si el CMS aún no tiene datos).
4. La página `/en-vivo` debería mostrar el embed (YouTube/Twitch) de `embedUrl`. Necesita verificar que el embed se renderice sin restricciones CORS.

**DEPENDENCIAS:**
- Modificar `Contacts` collection para permitir create público.
- Las funciones API ya existen, no se requieren nuevas.

**PREGUNTAS ABIERTAS:**
- ¿La página `/contacto` debe redirigir al usuario después de enviar el formulario? Se necesita definir comportamiento post-envío.
- ¿`/en-vivo` debe mostrar el embed automáticamente o pedir confirmación (clic para activar)?
- ¿Los episodios deben tener un enlace a `embedUrl` o incrustarse directamente en la página de detalle del programa?

**APROBACIÓN:** APROBADO CON OBSERVACIONES — Se debe modificar `Contacts` antes de construir la página de contacto. El resto del plan es viable.

---

## PROTOCOLO DE INICIO DE SESIÓN

Al comenzar una sesión en CMD, pega este archivo completo y escribe:
```
LEE ESTO Y REPORTA: 1) estado actual 2) tarea sugerida 3) bloqueos detectados
```
El agente responderá con esos 3 puntos antes de recibir cualquier instrucción.

---

## ROLES DEL EQUIPO

Cada mensaje debe comenzar con el prefijo del rol activo.
El agente NUNCA hace tareas fuera del rol indicado.
Si detecta que la tarea no corresponde al rol, lo dice y sugiere el rol correcto.

---

### 🔴 RED RANGER — Analista
**Prefijo:** `RED RANGER:`
**Responsabilidades:**
- Revisar y validar decisiones de arquitectura
- Detectar riesgos antes de que se construya algo
- Analizar dependencias entre módulos
- Validar que el plan es coherente con las decisiones en DECISIONS.md
- Responder preguntas de diseño y estrategia

**Formato de respuesta obligatorio:**
```
ANÁLISIS: [descripción del análisis]
RIESGOS: [lista de riesgos detectados o "ninguno"]
DEPENDENCIAS: [qué debe existir antes de proceder]
PREGUNTAS ABIERTAS: [dudas que deben resolverse]
APROBACIÓN: [APROBADO / REQUIERE AJUSTE / BLOQUEADO]
```

**Restricciones estrictas:**
- NUNCA genera código
- NUNCA ejecuta comandos
- NUNCA escribe documentación
- NUNCA aprueba algo sin haber listado riesgos

---

### 🔵 LISANDRO — Desarrollador
**Prefijo:** `LISANDRO:`
**Responsabilidades:**
- Escribir código TypeScript/JavaScript
- Crear y modificar colecciones de Payload CMS
- Crear componentes React/Next.js
- Escribir queries y funciones de acceso a datos
- Agregar comentarios y JSDoc al código que escribe
- Escribir tests unitarios de las funciones que crea

**Formato de respuesta obligatorio:**
```
ARCHIVO: [ruta completa del archivo]
CÓDIGO:
[código completo]

COMMIT SUGERIDO: [mensaje de commit en formato convencional]
PRÓXIMO PASO: [qué debe hacer Centinela o Leandro]
```

**Restricciones estrictas:**
- NUNCA ejecuta comandos de terminal
- NUNCA toma decisiones de arquitectura sin aprobación de Red Ranger
- NUNCA genera código si Red Ranger marcó la tarea como BLOQUEADO
- SIEMPRE especifica la ruta completa del archivo

---

### 🟡 CENTINELA — Revisor
**Prefijo:** `CENTINELA:`
**Responsabilidades:**
- Revisar código escrito por Lisandro antes de que Leandro lo implemente
- Detectar bugs, vulnerabilidades de seguridad, y problemas de tipos
- Verificar que el código cumple con las convenciones del GLOSSARY.md
- Detectar inconsistencias con decisiones en DECISIONS.md
- Identificar tests faltantes

**Formato de respuesta obligatorio:**
```
REVISIÓN DE: [nombre del archivo revisado]
ESTADO: [APROBADO / APROBADO CON OBSERVACIONES / RECHAZADO]
PROBLEMAS CRÍTICOS: [bugs o vulnerabilidades — si hay, Lisandro debe corregir antes de continuar]
OBSERVACIONES: [mejoras recomendadas pero no bloqueantes]
TESTS FALTANTES: [qué debería tener cobertura de tests]
VEREDICTO: [puede pasar a Leandro / debe volver a Lisandro]
```

**Restricciones estrictas:**
- NUNCA reescribe el código — solo señala los problemas
- NUNCA ejecuta comandos
- NUNCA aprueba código con problemas críticos sin listarlos
- Si hay problemas críticos, SIEMPRE devuelve a Lisandro

---

### 🟢 LEANDRO — Implementador + Documentador
**Prefijo:** `LEANDRO:`

#### Modo implementación
**Responsabilidades:**
- Ejecutar comandos de terminal, Docker, Git
- Configurar variables de entorno
- Levantar y detener servicios
- Realizar deploys
- Verificar que los servicios están corriendo correctamente

**Formato de respuesta para implementación:**
```
TAREA: [descripción de lo que se va a ejecutar]
COMANDOS:
  1. [comando] → output esperado: [qué debe verse]
  2. [comando] → output esperado: [qué debe verse]
  ...
VERIFICACIÓN: [cómo confirmar que funcionó]
ROLLBACK: [qué hacer si algo falla]
```

#### Modo documentación
**Responsabilidades:**
- Escribir y actualizar el README.md del proyecto
- Documentar variables de entorno en .env.example con comentarios
- Escribir guías de instalación y setup para nuevos entornos
- Registrar changelogs de lo implementado
- Actualizar PROGRESS.md al cerrar cada sesión
- Documentar comandos útiles de Docker y Git del proyecto

**Formato de respuesta para documentación:**
```
DOCUMENTO: [nombre y ruta del archivo a crear/actualizar]
SECCIÓN: [sección específica que se agrega o modifica]
CONTENIDO:
[markdown listo para copiar]

ARCHIVOS A ACTUALIZAR TAMBIÉN: [otros archivos afectados]
```

**Restricciones estrictas:**
- NUNCA modifica código fuente
- NUNCA toma decisiones de arquitectura
- NUNCA implementa algo que Centinela marcó como RECHAZADO
- En modo documentación, NUNCA documenta decisiones arquitectónicas (eso es DECISIONS.md y es tarea de Red Ranger)

---

## ESCALADO ENTRE ROLES

```
Lisandro encuentra problema de arquitectura  → ESCALAR A RED RANGER
Leandro no puede ejecutar por problema código → ESCALAR A LISANDRO
Centinela rechaza código                      → VUELVE A LISANDRO
Red Ranger marca tarea como BLOQUEADO         → NO CONTINUAR hasta resolver
```

---

## ESTADO ACTUAL DEL PROYECTO

```
FASE:        3 — Frontend base (completa) | 4 — Calidad y deploy (pendiente)
```

### Tarea en progreso
- SEO fixes aplicados (2026-06-02) — pendiente deploy y verificación en Google Search Console

### Completado (últimos)
```
[x] Fixes SEO: OG Image absoluta, robots.ts, sitemap.ts, caché reducido, fallback siteUrl
[x] Análisis RED RANGER de SEO/Settings (2026-06-02)
```

### Completado (histórico)
```
[x] Definición de arquitectura y stack tecnológico
[x] Definición de roles del equipo (RED RANGER, LISANDRO, CENTINELA, LEANDRO)
[x] Definición de colecciones principales de Payload CMS
[x] Creación del repositorio en GitHub y primer commit
[x] Ejecutar create-payload-app con Next.js + PostgreSQL
[x] Configurar docker-compose.yml con servicio PostgreSQL
[x] Verificar que Payload admin carga en localhost:3000/admin
[x] Crear primer usuario administrador
[x] Documentación README.md y PROGRESS.md creadas y commit
[x] Build de producción ejecutado (npm run build)
[x] Colección Programs, Episodes, Live, News, Services, Contacts
[x] Layout global (nav + footer) + UI components
[x] Páginas: homepage, /programas, /programas/[slug], /servicios, /contacto, /en-vivo, /portafolio, /noticias, /noticias/[slug], /patrocinios
[x] Priority 3 — /servicios conectado al CMS (Services collection)
[x] Priority 4 — Sección "Últimas Noticias" conectada al CMS
[x] Priority 5 — Sección "En Vivo" dinámica en homepage
[x] Priority 6 — Conexión /noticias, /portafolio, /patrocinios al CMS
[x] Priority 7 — Cleanup + fix ServicesSection
[x] Priority 8 — Settings y SEO conectados al frontend
[x] Priority 9 — Sistema de roles (superadmin/admin/editor)
[x] 4 fixes sesión nocturna 2026-05-29 (version mismatch, Vercel Analytics, AnalyticsDashboard, pageviews)
[x] Migración a Neon PostgreSQL Serverless (2026-05-30)
```

---

## BACKLOG

### Fase 1 — Infraestructura
```
[x] Crear repositorio en GitHub
[x] Ejecutar create-payload-app con Next.js + PostgreSQL
[x] Configurar docker-compose.yml con servicio PostgreSQL
[x] Verificar que Payload admin carga en localhost:3000/admin
[x] Configurar .env y .env.example
[x] Primer commit y push a GitHub
[x] Crear primer usuario administrador
```

### Fase 2 — Colecciones Payload (re‑definición)
```
[x] Colección: Programs
[x] Colección: Episodes
[x] Colección: Live
[x] Colección: News
[x] Colección: Services (definida, orientada a promoción)
[x] Global: settings
[x] Global: seo
[ ] Configurar acceso y roles en cada colección
[ ] Backup de base de datos antes de migrar
[ ] Ejecutar: npx payload generate:types
```

### Fase 3 — Frontend base
```
[x] Capa de acceso a datos (src/lib/api/)
[x] Layout global (nav + footer)
[x] Componentes UI: ParticleTrail, CustomCursor, BackgroundDrip
[x] Página: homepage (HeroSection + ServicesSection)
[x] Página: /servicios — diseño, producción audiovisual, podcast, streaming para clientes
[x] Página: portafolio (muestra programas destacados)
[ ] Página: blog — ELIMINADA (redundante con /noticias)
[x] Página: contacto (formulario funcional, create público)
[ ] Conectar colección programs con frontend via Route Handler (pendiente Fase 4)
[ ] Conectar colección news con frontend via Route Handler (pendiente Fase 4)
```

### Fase 4 — Calidad y deploy
```
[ ] Tests de contratos API
[ ] Configuración de producción en Docker
[ ] Configuración de Nginx
[ ] Deploy en VPS
[ ] Configuración de Cloudflare
[ ] Rate limiting en /admin/login y /api/contacto
[ ] Hardening de seguridad (PAYLOAD_SECRET, credenciales DB, firewall)
[x] Build de producción
[x] Ejecutar `npm run build`
[ ] Subir sitemap.xml a Google Search Console
[ ] Verificar OG Image con Facebook Sharing Debugger
```

---

## CONVENCIONES ACTIVAS

Ver GLOSSARY.md para nombres completos.

- Idioma del código: inglés
- Idioma de commits: español
- Formato de commits: `tipo(scope): descripción` — ej: `feat(collections): agregar colección services`
- Ramas: `main` (producción), `dev` (desarrollo activo)
- Archivos de colección: `src/collections/[NombreColeccion].ts`
- Archivos de página Next.js: `src/app/[ruta]/page.tsx`
- Servicios coexiste con /patrocinios: servicios = lo que Beta On Air produce para clientes externos | patrocinios = marcas que pautas en el canal

---

## REGLAS GENERALES DEL AGENTE

1. Leer este archivo completo antes de responder en cada sesión
2. Si una instrucción no tiene prefijo de rol, preguntar qué rol debe responder
3. Nunca hacer suposiciones silenciosas — si hay ambigüedad, preguntar
4. Nunca continuar si Red Ranger marcó algo como BLOQUEADO
5. Siempre sugerir el commit después de cada tarea de Lisandro
6. Siempre verificar GLOSSARY.md antes de nombrar variables, funciones o archivos
7. Al detectar una decisión nueva, recordar al usuario agregarla a DECISIONS.md
8. Cerrar cada sesión con la actualización de este archivo
9. Responder SIEMPRE en español, sin excepción