# BRAIN.md — betaonair
> Archivo de estado del proyecto. Leer completo al inicio de cada sesión.
> Actualizar obligatoriamente al cerrar cada sesión.
> Última actualización: 2026-05-21

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
FASE:        3 — Frontend base (casi completa) | 4 — Calidad y deploy (pendiente)
```

### Tarea en progreso
- Prioridad 5 — Sección "En Vivo" dinámica en homepage

### Completado (últimos)
```
[x] Fix formulario de contacto - campos alineados con colección Contacts + teléfono
[x] Fix episodios - query REST de Payload v3 corregida (fetch all + filter)
[x] Episodios dinámicos en /programas/[slug] conectados al CMS
[x] Decisión: Vercel descartado, solo Git para versionado y backup
[x] Decisión: Stack Docker + PostgreSQL confirmado para producción
[x] Build de producción: 17 rutas, 0 errores
[x] Prioridad 3 — /servicios conectado al CMS (Services collection) con getServices() + getServiceBySlug()
[x] Colección Projects registrada en payload.config (faltaba) + campo 'service' (relationship → Services)
[x] API projects.ts reconstruida (getProjects, getProjectsByService)
[x] API sponsorships.ts creada (getSponsorships)
[x] ServiceCards convertidas en Links → /servicios/[slug]
[x] Nueva página /servicios/[slug] con: detalle del servicio, grid de portafolio, marquee sponsors
[x] Prioridad 4 — Sección "Últimas Noticias" conectada al CMS en homepage
[x] getNews() corregido: filtro status=published + sort=-publishedAt + limit=10
[x] Array hardcodeado de noticias reemplazado por getNews().slice(0,3)
[x] Componente NewsCard usado en vez de divs inline (con link "Leer más →")
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
```

---

## ANÁLISIS RED RANGER — 2026-05-10 (Segunda)

**Áreas a corregir por LISANDRO (orden priorizado):**

1. **.env.example** — Agregar las variables `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_API_URL` según GLOSSARY.md, con comentarios explicativos. (bridge-grox.bat queda descartado por ahora según instrucción.)

2. **Fase 3 — Frontend base** — Una vez actualizado .env.example, Lisandro debe implementar:
   - Layout global (nav + footer)
   - Página de servicios (`src/app/servicios/page.tsx`) y su componente ServicesSection
   - Página de portafolio (`src/app/portafolio/page.tsx`) – actualmente redirige a /, reemplazar con contenido real
   - Página de blog (listado + detalle) (`src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`) – reemplazar redirecciones por contenido real
   - Página de contacto (`src/app/contacto/page.tsx`) – ya tiene esqueleto, integrar con colección Contacts de Payload

3. **Fase 2 — Colecciones Payload** — Modificar Services para que esté orientado a promoción (pendiente). Se puede hacer en paralelo.

**RIESGOS:** Implementar páginas sin datos en Payload puede generar errores de fetch. Se recomienda manejar estados vacíos o seed inicial.

**DEPENDENCIAS:** Deben existir colecciones news, programs, episodes, categories (ya creadas). La colección projects no existe en nueva arquitectura; portafolio deberá obtener datos de programs (se necesita confirmación de Red Ranger).

**PREGUNTAS ABIERTAS:** ¿Portafolio debe mostrar programs (nuevo) o projects (antiguo)? ¿La página de contacto debe conectarse a la colección `contacts` ya definida?

**APROBACIÓN:** APROBADO con la condición de resolver la duda sobre portafolio antes de implementar.

---

## ANÁLISIS RED RANGER — 2026-05-10 (Tercera)

**Correcciones pendientes para LISANDRO:**

- **bridge-grox.bat** — Se ha descartado temporalmente según instrucción. No requiere cambios ahora.
- **.env.example** — La variable `DATABASE_URL` ya fue corregida a PostgreSQL. Se alinea con `docker-compose.yml`. No hay más correcciones necesarias.
- **Fase 3 — Frontend base** — Lisandro debe implementar en orden:
  1. Layout global (nav + footer)
  2. Página de servicios (`src/app/servicios/page.tsx`) y `ServicesSection`
  3. Página de portafolio (`src/app/portafolio/page.tsx`) – **requiere confirmación sobre si debe usar programs o projects**
  4. Página de blog (listado y detalle) – reemplazar redirecciones
  5. Página de contacto – integrar con colección Contacts

**RIESGOS:** Implementar portafolio sin decidir fuente de datos puede generar duplicidad de lógica. Se recomienda esperar respuesta de Red Ranger.

**DEPENDENCIAS:** Las colecciones `programs`, `episodes`, `news`, `live`, `categories` ya existen. `contacts` también existe.

**PREGUNTAS ABIERTAS:** ¿Portafolio debe obtener datos de `programs` (nueva arquitectura) o de una colección `projects` separada? La decisión afecta la ruta `/portafolio`.

**APROBACIÓN:** APROBADO con la condición de resolver la duda sobre portafolio antes de comenzar esa página. Lisandro puede empezar con Layout global y servicios mientras tanto.

---

## ANÁLISIS RED RANGER — 2026-05-10 (Cuarta)

**ANÁLISIS:**

Estado actual del proyecto: Fase 2 (colecciones Payload) completada en su mayoría; Fase 3 (frontend base) implementada excepto la página de inicio (homepage) que aún muestra un apartado estático "Nuestros Servicios" (Diseño gráfico, Producción audiovisual, etc.). Según la solicitud, ese contenido debe ser reemplazado por elementos que reflejen lo que realmente se transmite en Beta On Air: **streamings en vivo**, **podcasts** y **programas propios** del canal.

**RIESGOS:**

- El componente `ServicesSection` actual en la homepage (`src/components/sections/ServicesSection.tsx`) probablemente contiene texto estático o llama a la colección `services` (orientada a promoción). Modificarlo para que muestre datos dinámicos (en vivo de `Live`, programas de `Programs`, etc.) requerirá cambios en el componente y quizás en la lógica de fetching.
- Si se elimina por completo la sección de "servicios promocionales", se perderá una funcionalidad planificada para la agencia. Se debe decidir si mantener ambas secciones separadas o fusionarlas bajo un nuevo enfoque.
- Existe dependencia de que las colecciones `Live` y `Programs` tengan datos de prueba para evitar pantallas vacías.

**DEPENDENCIAS:**

- Las colecciones `Live`, `Programs` y `Episodes` ya existen en `payload.config.ts` y sus APIs en `src/lib/api/`.
- El componente `ServicesSection` debe ser actualizado para usar `getLiveStreams()` y `getPrograms()` en lugar de `getServices()`.
- Se requiere confirmación sobre si la sección debe llamarse "En Vivo y Podcast" o "Nuestros Contenidos".

**PREGUNTAS ABIERTAS:**

- ¿Debemos eliminar por completo la colección `Services` y su referencia en el frontend, o mantenerla como para futura página de "Servicios Profesionales"?
- ¿El layout de la homepage debe incluir ahora un carrusel de programas en vivo y luego una grilla de podcasts (episodios recientes)?
- ¿Los enlaces del menú de navegación deben conservar "Servicios" o cambiarse a "Programas" y "En Vivo"?

**APROBACIÓN:** APROBADO con la condición de resolver las preguntas abiertas y de que Lisandro se encargue de modificar `ServicesSection` y concretar los cambios en la página de inicio.

---

## ANÁLISIS DE ESTADO — 2026-05-19

**ESTADO: Fase 3 (Frontend base) casi completa — Fase 4 (Calidad y deploy) pendiente.**

**FASES PENDIENTES:**
1. Fase 2 – Colecciones Payload (Services orientado a promoción), roles/accessos.
2. Fase 3 – Frontend base (Falta: conectar colecciones programs y news con frontend via Route Handler).
3. Fase 4 – Calidad y deploy (Tests de contratos API, configuración producción, Nginx).

**ANÁLISIS DE ENLACES — ACTUALIZADO 2026-05-19:**

- **/programas** – ✅ Funcional. Lista estática de 5 programas con slugs corregidos.
- **/programas/[slug]** – ✅ Funcional. Usa `getProgramBySlug` y `getEpisodesByProgram`.
- **/noticias** – ✅ Funcional. Lista estática de 4 noticias.
- **/noticias/[slug]** – ✅ Funcional. Server Component con `params: Promise`.
- **/en‑vivo** – ✅ Funcional. Llama a `getLiveStreams`, muestra embed o mensaje.
- **/contacto** – ✅ Funcional. `create: () => true` habilitado en colección Contacts.
- **/portafolio** – ✅ Funcional. Muestra grid de programas destacados con logos y descripciones.
- **/servicios** – ✅ Funcional. Página con 4 servicios placeholder: Producción Audiovisual, Podcast, Streaming en Vivo, Diseño Gráfico.
- **/patrocinios** – ✅ Funcional. Página con beneficios para patrocinadores.
- **/blog** – ❌ ELIMINADA. Era redundante con /noticias.
- **Navegación global** – ✅ Implementada. 7 enlaces: Inicio, Programas, En Vivo, Noticias, Patrocinios, Servicios, Contacto.

**RIESGOS DETECTADOS:**
- Sin datos de prueba en Payload, las páginas de detalle (/programas/[slug], /noticias/[slug]) dependen de datos estáticos locales.
- La colección Services está definida pero la página /servicios usa datos placeholder; falta integrar con datos dinámicos del CMS.
- El seed (`src/seed/index.ts`) usa `DATABASE_URI` (unificado con payload.config.ts) pero debe ejecutarse manualmente.
- `/blog` fue eliminada. No quedan referencias huérfanas.

**RECOMENDACIÓN:** Ejecutar seed manualmente desde Payload admin para poblar datos de prueba. Conectar páginas de detalle a datos dinámicos cuando el CMS tenga contenido real.

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

---

### Últimos cambios (documentado por LEANDRO — 2026-05-19)

- **Unificado `DATABASE_URI`** en `src/seed/index.ts` — antes usaba `DATABASE_URL` (inconsistente con `payload.config.ts`).
- **Eliminada carpeta `/blog`** — redundante con `/noticias`. Sin referencias huérfanas.
- **Build de producción ejecutado** — `npm run build` exitoso. 13 páginas generadas. Sin errores.
- **Verificados archivos fantasma** — `ProgramCover.ts`, `ProgramLogo.ts`, `lib/api/media.ts` no existen en disco ni son importados por nadie. Son solo tabs residuales en el editor.
- **Actualizado BRAIN.md** — refleja estado real del proyecto.

### Cambios anteriores (2026-05-17)

- Corregido script dev en package.json (eliminado `--no-turbopack`).
- Creado `src/lib/data/programas.ts` con datos estáticos de los 5 programas.
- Creado `src/lib/data/noticias.ts` con datos estáticos de 4 noticias.
- Actualizadas páginas `/programas/[slug]` y `/noticias/[slug]` para usar datos estáticos locales.
- Formulario de contacto: se habilitó `create: () => true` en colección Contacts.
- Slug corregido de `the-bronta-time` a `the-bronca-time`.
- Creada página `/servicios` con contenido placeholder.
- Layout global implementado con nav + footer.
- Portafolio ahora muestra grid de programas (ya no redirige).

---

### RED RANGER — Tareas pendientes (2026-05-21)

**Tareas inmediatas por orden de prioridad:**

1. **Conectar /servicios con colección Services** — La colección ya está definida y la API existe. La página usa datos hardcodeados.
2. **Sección de noticias dinámica en homepage** — Usar `getNews()` que ya existe en lugar de datos hardcodeados.
3. **Sección "En Vivo" en homepage** — Usar `getLiveStreams()` (actualmente muestra solo un `<h2>` vacío).
4. **Revisar /noticias, /patrocinios, /portafolio** — Verificar si usan CMS o datos estáticos.
5. **Ajustar embedUrl en admin** — Cambiar URLs de YouTube de formato `/watch?v=` a `/embed/`.
6. **Fase 4 — Tests y configuración de producción** — Nginx, variables de entorno, hardening de seguridad.

**Completado en esta sesión:**
- ✅ Fix formulario de contacto (campos `nombre`, `email`, `telefono`, `mensaje`)
- ✅ Fix query REST de episodios en Payload v3
- ✅ Episodios dinámicos en `/programas/[slug]`
- ✅ Decisión de no usar Vercel — solo Git para versionado

**Bloqueos detectados:**
- Ningún bloqueo actual.

---

