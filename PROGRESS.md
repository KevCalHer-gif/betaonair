# PROGRESS.md — Betaonair

## Resumen General del Proyecto

Plataforma digital de contenidos bolivianos. Next.js + Payload CMS v3 + PostgreSQL + Docker.

---

### Fase 1 — Infraestructura (completada)
- [x] Crear repositorio en GitHub
- [x] Ejecutar create-payload-app con Next.js + PostgreSQL
- [x] Configurar docker-compose.yml con servicio PostgreSQL
- [x] Verificar que Payload admin carga en localhost:3000/admin
- [x] Crear primer usuario administrador
- [x] Primer commit y push a GitHub

### Fase 2 — Colecciones Payload (completada)
- [x] Colección: Users (roles: admin, editor, viewer)
- [x] Colección: Media
- [x] Colección: Categories
- [x] Colección: Contacts
- [x] Colección: Programs
- [x] Colección: Episodes
- [x] Colección: News
- [x] Colección: Live
- [x] Colección: Sponsorships
- [x] Colección: Services
- [x] Colección: Projects
- [x] Global: Settings
- [x] Global: Seo

### Fase 3 — Frontend base (completada)
- [x] Layout global (nav + footer)
- [x] UI components (BackgroundDrip, GalaxyButton, NewsCard, ProgramCard, etc.)
- [x] Homepage con Hero, Programas, Noticias (ahora dinámico)
- [x] /programas — grid de programas desde CMS
- [x] /programas/[slug] — detalle con episodios desde CMS
- [x] /servicios — grid de servicios desde CMS con links a detalle
- [x] /servicios/[slug] — detalle + portafolio + marquee sponsors
- [x] /contacto — formulario conectado a colección Contacts
- [x] /en-vivo — página de streaming
- [x] /noticias — listado de noticias
- [x] /noticias/[slug] — detalle de noticia
- [x] /patrocinios — listado de patrocinadores
- [x] /portafolio — grid de programas (placeholder)

### Fase 4 — Calidad y deploy (completada)
- [x] Roles de usuario configurados
- [x] Dashboard con métricas básicas
- [x] Vercel Analytics descartado (no se usa Vercel)
- [x] Build de producción verificado (17 rutas, 0 errores)

### Pendiente futuro
- Migrar /noticias a usar CMS (actualmente usa datos estáticos)
- Migrar /patrocinios a usar CMS
- Migrar /portafolio a usar CMS (Projects collection)
- Añadir contenido real a sección "En Vivo" en homepage
- Configurar Nginx + SSL para producción
- Hardening de seguridad
- Tests automatizados

---

## Notas adicionales

### [2026-05-11] — Avance documentado por LEANDRO
- Infraestructura local completamente funcional
- Payload admin accesible en localhost:3000/admin
- PostgreSQL corriendo en Docker
- Tipos de TypeScript generados correctamente

### [2026-05-11] — Análisis RED RANGER según PROMPT.txt
- Se identificaron 7 prioridades para completar la Fase 3
- Prioridad 1: formulario de contacto no guardaba datos
- Prioridad 2: episodios no se mostraban en /programas/[slug]
- Prioridad 3: servicios con datos hardcodeados
- Prioridades 4-7: homepage, noticias, en vivo, patrocinios

### [2026-05-11] — Revisión CENTINELA: fix de `this.alpha` en layout.tsx
- Detectado error de sintaxis por backticks mal escapados
- Corregido por LISANDRO

### [2026-05-11] — CENTINELA: Análisis crítico sobre la rotura de la página
- La página no cargaba por error en layout.tsx
- Se identificó la causa raíz y se corrigió

### [2026-05-11] — RED RANGER: Análisis del error de backticks en layout.tsx
- Confirmado que era un error de escape de caracteres

### [2026-05-11] — CENTINELA: Instrucciones precisas para LISANDRO
- Se dieron instrucciones paso a paso para el fix

### [2026-05-11] — LISANDRO: Escalación a LEANDRO para ejecutar `npm run dev`
- Necesario verificar que el fix funcionaba en tiempo real

### [2026-05-11] — LEANDRO: Verificación `npm run dev` — página carga correctamente
- El fix fue exitoso, la página carga sin errores

### [2026-05-11] — LEANDRO: Verificación visual de fondo animado en http://localhost:3000
- Fondo animado funciona correctamente

### [2026-05-11] — LEANDRO: Commit, build y documentación del fix de fondo negro
- Commit realizado, build exitoso, documentación actualizada

### [2026-05-11] — RED RANGER: Análisis de PROMPT.txt sobre fondo negro sólido
- Se analizó la causa del fondo negro (variable CSS no definida)

### [2026-05-11] — RED RANGER: Aprobación de modificación de colección Services
- Se aprobó añadir campos isActive y order a Services

### [2026-05-11] — LEANDRO: Ejecuta npx payload generate:types
- Tipos regenerados después del cambio en Services

### [2026-05-11] — RED RANGER: Análisis de backlog según PROMPT.txt
- Se priorizaron las tareas pendientes

### [2026-05-11] — RED RANGER: Respuesta a PROMPT.txt sobre próxima prioridad
- Se definió continuar con Prioridad 1 (formulario de contacto)

### [2026-05-11] — Consulta de correo registrado en Git
- Verificado: kevin.callizaya.c@gmail.com

### [2026-05-12] — Documentación del proyecto y commit
- Se documentó el estado actual y se hizo commit

### [2026-05-12] — Respuesta a consulta sobre archivo de documentación
- Se explicó la estructura de documentación

### [2026-05-12] — LEANDRO: Documentación final y preparación para deploy
- Documentación completa, proyecto listo para siguiente fase

### [2026-05-13] — LEANDRO: Ejecución de build de producción según PROMPT.txt
- Build exitoso, 13 rutas generadas

### [2026-05-13] — LEANDRO: Ejecución de `npx payload generate:types` y commit final de Fase 2
- Tipos regenerados, commit y push

### [2026-05-13] — LEANDRO: Commit y push de Fase 3 y actualización de PROGRESS.md
- Fase 3 completada y documentada

### [2026-05-13] — LEANDRO: Commit y push de Fase 3 – páginas noticias/[slug] y patrocinios
- Nuevas páginas añadidas

### [2026-05-13] — LEANDRO: Commit de roles de usuario, dashboard con métricas y Vercel Analytics
- Roles y dashboard implementados

### [2026-05-13] — LEANDRO: Actualización de PROGRESS.md con estado actual del repositorio
- Documentación actualizada

### [2026-05-14] — LEANDRO: Documentación de commits de UI y refactor visual
- Mejoras visuales documentadas

### [2026-05-15] — LEANDRO: Documentación de todo lo realizado hasta la fecha
- Resumen completo del proyecto

### [2026-05-17] — LEANDRO: Documentación de correcciones y datos compartidos
- Correcciones varias documentadas

### [2026-05-17] — LEANDRO: Confirmación de documentación completa hasta la fecha
- Documentación al día

### [2026-05-17] — RED RANGER: Análisis de estado y tareas pendientes
- Se identificaron prioridades actualizadas

### [2026-05-17] — RED RANGER & CENTINELA: Verificación de tareas de LISANDRO
- Tareas verificadas

### [2026-05-17] — LEANDRO: Ejecución de npm run build exitosa
- Build verificado

### [2026-05-17] — LEANDRO: Corrección de error onMouseEnter/Leave en Server Component
- Error corregido

### [2026-05-20/21] — LEANDRO: Documentación de cierre de sesión
- Cierre de sesión documentado y commiteado

### [2026-05-21] — LEANDRO: Prioridad 1 — Fix formulario de contacto
- Campos alineados con colección Contacts (nombre, email, telefono, mensaje, fechaRecibido)
- Añadido campo teléfono al formulario
- Mejorado manejo de errores con mensajes de Payload

### [2026-05-21] — LEANDRO: Prioridad 2 — Episodios dinámicos en /programas/[slug]
- Fix query REST Payload v3: cambiado de `where[program.slug][equals]=` a fetch-all + filter
- Página /programas/[slug] ahora muestra episodios reales del CMS
- YouTube embedding funcional (requiere configuración en YouTube Studio)
- Build: 16 rutas, 0 errores

### [2026-05-21] — Decisiones de arquitectura
- Vercel descartado como plataforma de testeo. Solo Git para versionado.
- Stack confirmado: Next.js + Payload CMS v3 + PostgreSQL + Docker (VPS al momento del release).
- PostgreSQL + Docker validados como seguros para producción con hardening adecuado.

### [2026-05-21] — LEANDRO: Prioridad 3 — /servicios conectado al CMS + página detalle

**Cambios realizados:**
- Reconstruido `src/lib/api/services.ts` con `getServices()` y `getServiceBySlug()` (patrón programs.ts)
- Rewrite de `/servicios` como Server Component consumiendo CMS vía `getServices()`
- Corregido `payload.config.ts`: colección `Projects` no estaba registrada (nunca se generó el tipo)
- Añadido campo `service` (relationship → services) a colección `Projects`
- Regenerados tipos con `npx payload generate:types` → nuevo `Project` interface
- Reconstruido `src/lib/api/projects.ts`: `getProjects()` + `getProjectsByService(slug)`
- Creado `src/lib/api/sponsorships.ts`: `getSponsorships()` (sponsors activos)
- Actualizado `src/lib/api/index.ts` con nuevos exports
- ServiceCards en `/servicios` ahora son `<Link>` que redirigen a `/servicios/[slug]`
- Nueva página dinámica `/servicios/[slug]`:
  - Detalle del servicio (título, descripción richText→plain, features, precio)
  - Grid de portafolio: proyectos filtrados por servicio (imagen, título, cliente, descripción)
  - Marquee infinito de sponsors: CSS `@keyframes marqueeScroll`, pausa en hover
- `npm run build`: 17 rutas, 0 errores
- Commit + push a GitHub

### [2026-05-21] — LEANDRO: Prioridad 4 — Sección "Últimas Noticias" dinámica en homepage

**Cambios realizados:**
- Corregido `getNews()`: añadido `?where[status][equals]=published&sort=-publishedAt&limit=10`
- Reemplazado array hardcodeado de 3 noticias por `(await getNews()).slice(0, 3)` en homepage
- Reemplazados divs inline por componente `NewsCard` (título, fecha formateada con `toLocaleDateString('es-BO')`, extracto, link "Leer más →")
- Añadido fallback "No hay noticias publicadas aún" cuando no hay datos
- `npm run build`: 17 rutas, 0 errores
- Commit + push a GitHub

**Próximo paso:** Prioridad 5 — Sección "En Vivo" dinámica en homepage (completada).

### [2026-05-23] — LEANDRO: Prioridad 5 — Sección "En Vivo" dinámica en homepage

**Análisis RED RANGER:**
- **Error:** Sección En Vivo vacía (solo `<h2>`), sin datos del CMS.
- **Causa:** `getLiveStreams()` usaba `?where[isActive][equals]=true` — Payload v3 no soporta filtros en checkbox (mismo bug de Priority 2).
- **Solución (2 pasos):** (1) Cambiar a fetch-all `?depth=1` + client-side `.filter(s => s.isActive === true)`. (2) Reemplazar sección vacía por bloque dinámico con iframe 16:9, título, link al programa, y placeholder cuando no hay stream.
- **Verificación:** API retorna stream con `isActive:true` y `embedUrl`. Build: 17 rutas, 0 errores.

**Cambios realizados:**
- Corregido `getLiveStreams()` en `src/lib/api/live.ts`: `?depth=1` + `.filter(s => s.isActive === true)` (mismo patrón que `getEpisodesByProgram()`)
- Sección "En Vivo" en `page.tsx`: iframe 16:9 con `allowFullScreen`, título del stream, link al programa, placeholder con icono 📡
- `npm run build`: 17 rutas, 0 errores
- Commit + push a GitHub

**Próximo paso:** Prioridad 6 — Revisar `/noticias`, `/patrocinios`, `/portafolio` (completada).

### [2026-05-23] — LEANDRO: Prioridad 6 — Conectar /noticias, /portafolio y /patrocinios al CMS

**Análisis RED RANGER:**
- `/noticias` + `/noticias/[slug]` usaban `data/noticias.ts` (4 noticias hardcodeadas). No reflejaban el CMS.
- `/portafolio` usaba `data/programas.ts` (5 programas hardcodeados). Logos, descripciones no se actualizaban.
- `/patrocinios` era pitch de ventas estático sin mostrar sponsors reales. Se decidió Opción B: mantener pitch + agregar sección de sponsors reales.

**Cambios realizados:**
- [`noticias/page.tsx`](src/app/(frontend)/noticias/page.tsx): Convertido de `'use client'` con array hardcodeado a `async function` con `getNews()`. Usa `NewsCard` existente con `n.title`, `n.publishedAt` (formateado), `n.slug`, `n.excerpt`.
- [`noticias/[slug]/page.tsx`](src/app/(frontend)/noticias/[slug]/page.tsx): Reemplazado `noticias.find()` por `getNewsBySlug(slug)`. Añadido `extractParagraphs()` para renderizar rich text Lexical. Fecha formateada con `toLocaleDateString('es-BO')`.
- [`portafolio/page.tsx`](src/app/(frontend)/portafolio/page.tsx): Convertido a `async function` con `getPrograms()`. Logo extraído de relación Media con fallback "Sin logo". Descripción desde `prog.description`.
- [`patrocinios/page.tsx`](src/app/(frontend)/patrocinios/page.tsx): Convertido a `async function`. Mantiene pitch de ventas (4 beneficios). Nueva sección "Marcas que confían en nosotros" con marquee animado de sponsors desde `getSponsorships()` (logos + nombres). Mismo patrón que `servicios/[slug]`.
- `npm run build`: 17 rutas, 0 errores
- Commit + push a GitHub

**Archivos ahora obsoletos (datos hardcodeados reemplazados):**
- `src/lib/data/noticias.ts` — solo lo usa `/noticias` y `/noticias/[slug]` (ya migrados)
- `src/lib/data/programas.ts` — lo usaba `/portafolio` (ya migrado). También lo usa `ProgramsGrid.tsx`

**Próximo paso:** Prioridad 7 — Revisar `ProgramsGrid.tsx` y componentes que usen `data/programas.ts`. Luego Fase 4: tests + producción.
