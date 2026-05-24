# Payload CMS Admin Panel — Análisis Completo

> 📅 Documentado por RED RANGER — 2026-05-24
> 📦 Versión: Payload CMS v3 + PostgreSQL + Next.js 16

---

## 🧭 ESTRUCTURA GENERAL

El panel de Payload CMS (`/admin`) tiene **11 colecciones** y **2 globales**, registrados en [`payload.config.ts`](../src/payload.config.ts:33-34):

```
Colecciones: Users, Media, Categories, Contacts, Programs, Episodes, 
             News, Live, Sponsorships, Services, Projects
Globales:    Settings, SEO
```

---

## 📊 COLECCIONES — Análisis uno por uno

---

### 1. 👤 USERS (`users`)

**Archivo:** [`src/collections/Users.ts`](../src/collections/Users.ts)

**Para qué sirve:** Gestión de usuarios del panel admin. Solo los admins pueden crear/editar/eliminar usuarios. Cada usuario tiene un rol que determina sus permisos.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `email` | email (por defecto de Payload) | ✅ | Email del usuario. Se usa como título en la lista. |
| `password` | password (por defecto) | ✅ | Contraseña del usuario. |
| `role` | `select` | ✅ | Rol del usuario. Opciones: `admin` (acceso total), `editor` (crear/editar), `viewer` (solo lectura). Default: `editor`. |

**Permisos (Access Control):**

| Operación | admin | editor | viewer | público |
|---|---|---|---|---|
| **read** | ✅ Todos | ❌ Solo su propio perfil | ❌ Solo su propio perfil | ❌ |
| **create** | ✅ | ❌ | ❌ | ❌ |
| **update** | ✅ | ❌ | ❌ | ❌ |
| **delete** | ✅ | ❌ | ❌ | ❌ |
| **admin** (acceder al panel) | ✅ | ❌ | ❌ | ❌ |

**⚠️ BUG:** El campo `read` para `editor` y `viewer` retorna `{ id: { equals: user.id } }` — pero el `admin` access está en `false` para ellos, así que NUNCA pueden entrar al panel. Solo `admin` puede.

**Dónde se reflejan los cambios:** Solo en el panel admin. No afecta al frontend público.

---

### 2. 🖼️ MEDIA (`media`)

**Archivo:** [`src/collections/Media.ts`](../src/collections/Media.ts)

**Para qué sirve:** Galería de imágenes. Todas las relaciones de tipo `upload` o imagen en otras colecciones apuntan aquí. Lectura pública (cualquiera puede ver las imágenes). Solo usuarios autenticados pueden subir.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `alt` | `text` | ✅ | Texto alternativo para accesibilidad y SEO |
| (archivo) | upload | ✅ | El archivo de imagen subido |

**Tamaños de imagen generados automáticamente:**

| Nombre | Dimensiones | Fit | Dónde se usa |
|---|---|---|---|
| `program_logo` | 400×400 | cover, centro | Logos de programas en `ProgramCard`, `/programas/[slug]`, `/portafolio` |
| `program_cover` | 1900×500 | cover, centro | Portadas de programas en `/programas/[slug]` |
| `thumbnail` | (por defecto de Payload) | — | Miniaturas en listas del admin |
| `focalPoint` | — | — | Permite elegir el punto focal para crops |

**Dónde se reflejan los cambios:** En todas las páginas que muestren imágenes del CMS — logos de programas, portadas, fotos de noticias, logos de sponsors, thumbnails de proyectos.

---

### 3. 🏷️ CATEGORIES (`categories`)

**Archivo:** [`src/collections/Categories.ts`](../src/collections/Categories.ts)

**Para qué sirve:** Clasificación de noticias (ej: "Deportes", "Cultura", "Tecnología"). Se relaciona con la colección `News` vía el campo `categories` (hasMany: true).

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `name` | `text` | ✅ | Nombre de la categoría (único). Ej: "Deportes" |
| `slug` | `text` (sidebar, autogenerado) | — | Slug para URLs. Se genera solo del `name`. |
| `description` | `textarea` | ❌ | Descripción opcional de la categoría |
| `color` | `text` | ❌ | Color asociado (ej: `#1378B4`). Se muestra en la lista del admin. |

**⚠️ ADVERTENCIA:** Actualmente **no se usa en el frontend**. Está definida la relación en `News.categories` pero ninguna página filtra ni muestra categorías. Es infraestructura lista para usar.

**Dónde se reflejarían los cambios:** En `/noticias` si se implementara filtro por categoría. Por ahora solo en el admin.

---

### 4. ✉️ CONTACTS (`contacts`)

**Archivo:** [`src/collections/Contacts.ts`](../src/collections/Contacts.ts)

**Para qué sirve:** Bandeja de entrada de mensajes del formulario de contacto. Cuando un visitante llena el formulario en `/contacto`, se crea un registro aquí. **Solo usuarios autenticados pueden leerlos**, pero **cualquiera (público) puede crear** (enviar un mensaje).

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `nombre` | `text` | ✅ | Nombre de la persona que contacta. Se usa como título en la lista. |
| `email` | `email` | ✅ | Email del contacto |
| `telefono` | `text` | ❌ | Teléfono (opcional) |
| `mensaje` | `textarea` | ✅ | El mensaje enviado |
| `leido` | `checkbox` | ❌ | Marcar como leído/no leído. Default: `false` (no leído). |
| `fechaRecibido` | `date` | ❌ | Fecha en que se recibió el mensaje |

**Columnas visibles en la lista del admin:** `nombre`, `email`, `leido`

**Dónde se reflejan los cambios:** El formulario de `/contacto` crea registros aquí. **El frontend NO muestra estos mensajes** — solo se ven en el panel admin.

---

### 5. 📺 PROGRAMS (`programs`)

**Archivo:** [`src/collections/Programs.ts`](../src/collections/Programs.ts)

**Para qué sirve:** Programas del canal (Beta Kids, No Tan Calladitas, etc.). Es la colección más referenciada desde el frontend.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Nombre del programa (único). Se usa como título en la lista. |
| `slug` | `text` (sidebar, autogenerado) | — | Slug para URL (`/programas/[slug]`). Autogenerado del `title`. |
| `description` | `textarea` | ✅ | Descripción del programa. Se muestra en `/portafolio` y `ProgramCard`. |
| `logo` | `upload` → `media` | ✅ | Logo del programa. Cropeado a 400×400 (`program_logo`). |
| `coverImage` | `upload` → `media` | ✅ | Portada del programa. Cropeado a 1900×500 (`program_cover`). |
| `accentColor` | `text` | ❌ | Color de acento. Default: `#c61d4a` (rojo Beta). |
| `isLive` | `checkbox` | ❌ | Si el programa está transmitiendo en vivo. Default: `false`. |
| `liveUrl` | `text` | ❌ | URL del stream en vivo del programa (si `isLive = true`). |
| `status` | `select` | ❌ | `active` o `inactive`. Default: `active`. |

**Columnas visibles en la lista:** `title`, `isLive`, `status`

**⚠️ ADVERTENCIA:** Los campos `isLive` y `liveUrl` **no se usan en el frontend**. El sistema de "En Vivo" usa la colección `Live`, no estos campos del programa. Son campos heredados/obsoletos.

**Dónde se reflejan los cambios:**
- **`/programas`** — listado de programas
- **`/programas/[slug]`** — detalle con logo, portada, descripción, episodios
- **`/portafolio`** — grid con logos y descripciones
- **Homepage** — sección de programas (`ProgramCard`)
- **`ServicesSection`** (si se usara)

---

### 6. 🎙️ EPISODES (`episodes`)

**Archivo:** [`src/collections/Episodes.ts`](../src/collections/Episodes.ts)

**Para qué sirve:** Episodios individuales de cada programa. Se vinculan a un programa vía relación.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Título del episodio |
| `slug` | `text` (sidebar, autogenerado) | — | Slug autogenerado del `title` |
| `program` | `relationship` → `programs` | ✅ | Programa al que pertenece este episodio. |
| `embedUrl` | `text` | ❌ | URL de YouTube en formato `/embed/`. Si está presente, se muestra un iframe. |
| `thumbnail` | `relationship` → `media` | ❌ | Miniatura del episodio |
| `publishedAt` | `date` | ❌ | Fecha de publicación |
| `status` | `select` | ❌ | `draft` o `published`. Default: `published`. |

**Columnas visibles en la lista:** `title`, `program`, `publishedAt`

**Dónde se reflejan los cambios:**
- **`/programas/[slug]`** — lista de episodios filtrados por el slug del programa. Cada episodio muestra iframe de YouTube si tiene `embedUrl`, o texto del episodio.

**⚠️ BUG CONOCIDO (Payload v3):** La API REST no soporta `?where[program.slug][equals]=X`. Workaround implementado en `getEpisodesByProgram()`: fetch-all + client-side filter.

---

### 7. 📰 NEWS (`news`)

**Archivo:** [`src/collections/News.ts`](../src/collections/News.ts)

**Para qué sirve:** Noticias y artículos publicados. Aparecen en la homepage y en `/noticias`.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Título de la noticia (único). |
| `slug` | `text` (sidebar, autogenerado) | — | Slug para URL (`/noticias/[slug]`). |
| `excerpt` | `textarea` | ❌ | Extracto/resumen. Se muestra en `NewsCard` (homepage y `/noticias`). |
| `content` | `richText` (Lexical) | ❌ | Contenido completo. Se parsea en `/noticias/[slug]` con `extractParagraphs()`. |
| `coverImage` | `relationship` → `media` | ❌ | Imagen de portada (actualmente no se usa en el frontend). |
| `sourceUrl` | `text` | ❌ | URL de la fuente original si es republicado. |
| `sourceName` | `text` | ❌ | Nombre de la fuente original. |
| `categories` | `relationship` → `categories` (hasMany) | ❌ | Categorías. No se usa en frontend aún. |
| `publishedAt` | `date` | ❌ | Fecha de publicación. Se formatea con `toLocaleDateString('es-BO')`. |
| `status` | `select` | ❌ | `draft` o `published`. Default: `published`. Solo `published` aparecen en frontend. |

**Columnas visibles en la lista:** `title`, `publishedAt`, `status`

**Dónde se reflejan los cambios:**
- **Homepage** — últimas 3 noticias (`.slice(0, 3)`)
- **`/noticias`** — todas las publicadas
- **`/noticias/[slug]`** — detalle con título, fecha, extracto, contenido rich text

---

### 8. 📡 LIVE (`live`)

**Archivo:** [`src/collections/Live.ts`](../src/collections/Live.ts)

**Para qué sirve:** Transmisiones en vivo actuales. Solo se muestra la que tenga `isActive = true`.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Título de la transmisión (ej: "En Vivo — No Tan Calladitas"). |
| `embedUrl` | `text` | ❌ | URL de YouTube en formato `/embed/`. Debe usar `/embed/` no `/watch?v=`. |
| `isActive` | `checkbox` | ❌ | Si está activa. Default: `false`. **Solo una debe estar activa a la vez.** |
| `program` | `relationship` → `programs` | ❌ | Programa asociado. Si se vincula, el homepage muestra link a `/programas/[slug]`. |

**Columnas visibles en la lista:** `title`, `isActive`

**Dónde se reflejan los cambios:**
- **Homepage** — sección "En Vivo": iframe 16:9 con `embedUrl`, título, link al programa. Si no hay transmisión activa, muestra placeholder "No hay transmisión en vivo en este momento" 📡.

**⚠️ BUG CONOCIDO (Payload v3):** `?where[isActive][equals]=true` no funciona en checkbox. Workaround: fetch-all + client-side `.filter()`.

---

### 9. 🤝 SPONSORSHIPS (`sponsorships`)

**Archivo:** [`src/collections/Sponsorships.ts`](../src/collections/Sponsorships.ts)

**Para qué sirve:** Marcas y patrocinadores del canal. Se muestran en marquee animado.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `name` | `text` | ✅ | Nombre del patrocinador (único). |
| `slug` | `text` (sidebar, autogenerado) | — | Slug autogenerado del `name`. |
| `description` | `textarea` | ❌ | Descripción. **No se usa en frontend.** |
| `logo` | `relationship` → `media` | ❌ | Logo del patrocinador. Se muestra en el marquee. |
| `url` | `text` | ❌ | Link al sitio del patrocinador. **No se usa en frontend (pendiente).** |
| `status` | `select` | ❌ | `active` o `inactive`. Default: `active`. Solo `active` aparecen. |

**Dónde se reflejan los cambios:**
- **`/patrocinios`** — marquee animado "Marcas que confían en nosotros" (solo logos + nombres).
- **`/servicios/[slug]`** — mismo marquee al final de cada servicio.

**⚠️** Los campos `description` y `url` existen pero no se renderizan en ninguna página. Oportunidad de mejora: si `url` existe, hacer el logo clickeable.

---

### 10. 🔧 SERVICES (`services`)

**Archivo:** [`src/collections/Services.ts`](../src/collections/Services.ts)

**Para qué sirve:** Servicios profesionales ofrecidos por Beta On Air (Producción Audiovisual, etc.).

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Título del servicio. |
| `slug` | `text` (sidebar, readonly, autogenerado) | — | Slug autogenerado. Readonly en admin. |
| `description` | `richText` | ❌ | Descripción del servicio (formato Lexical). Se parsea con `extractPlainText()`. |
| `price` | `number` | ❌ | Precio de referencia. Se muestra como "Bs. X". |
| `features` | `array` | ❌ | Lista de características/beneficios. Cada item tiene campo `feature` (text). |
| `isActive` | `checkbox` | ❌ | Si está activo. Default: `true`. |
| `order` | `number` (sidebar) | ❌ | Orden de visualización. Menor número = primero. |

**Permisos especiales:** Solo `admin` y `editor` pueden crear/editar. Solo `admin` puede eliminar.

**Dónde se reflejan los cambios:**
- **`/servicios`** — listado de servicios activos, ordenados por `order`. Muestra título, descripción, features, y link a detalle.
- **`/servicios/[slug]`** — detalle con descripción, features, precio, proyectos relacionados, marquee de sponsors, CTA "Solicita este servicio".

---

### 11. 📁 PROJECTS (`projects`)

**Archivo:** [`src/collections/Projects.ts`](../src/collections/Projects.ts)

**Para qué sirve:** Proyectos/trabajos realizados (portafolio profesional). Se vinculan a un servicio.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | `text` | ✅ | Título del proyecto. |
| `slug` | `text` (sidebar, readonly, autogenerado) | — | Slug autogenerado. Readonly. |
| `description` | `richText` | ❌ | Descripción (Lexical). Se trunca a 120 chars en el listado. |
| `client` | `text` | ❌ | Nombre del cliente. Se muestra como "Cliente: X". |
| `service` | `relationship` → `services` | ❌ | Servicio relacionado. Se filtran proyectos por `service.slug`. |
| `thumbnail` | `upload` → `media` | ❌ | Imagen principal del proyecto. |
| `status` | `select` | ❌ | `draft`, `published` o `archived`. Default: `draft`. |
| `order` | `number` (sidebar) | ❌ | Orden de visualización. |

**Dónde se reflejan los cambios:**
- **`/servicios/[slug]`** — sección "Trabajos realizados" con grid de proyectos vinculados. Muestra thumbnail, título, cliente, y extracto de descripción (120 chars).

---

## 🌐 GLOBALES

---

### 12. ⚙️ SETTINGS (`settings`)

**Archivo:** [`src/globals/Settings.ts`](../src/globals/Settings.ts)

**Para qué sirve:** Configuración general del sitio. Solo admin puede modificar.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `siteName` | `text` | ✅ | Nombre del sitio (ej: "Beta On Air") |
| `slogan` | `text` | ❌ | Eslogan |
| `logoUrl` | `text` | ❌ | URL del logo |
| `facebookUrl` | `text` | ❌ | Link a Facebook |
| `instagramUrl` | `text` | ❌ | Link a Instagram |
| `youtubeUrl` | `text` | ❌ | Link a YouTube |
| `tiktokUrl` | `text` | ❌ | Link a TikTok |

**⚠️ ADVERTENCIA:** Estos campos **NO se usan en el frontend**. Los datos de redes sociales y nombre del sitio están hardcodeados en los componentes. Es infraestructura lista para conectar.

**Dónde se reflejarían los cambios:** Header, footer, SEO, `SocialMediaSection`. Pero actualmente no están conectados.

---

### 13. 🔍 SEO (`seo`)

**Archivo:** [`src/globals/Seo.ts`](../src/globals/Seo.ts)

**Para qué sirve:** Configuración de meta tags para SEO. Solo admin puede modificar.

**Campos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `metaTitle` | `text` | ✅ | Título que aparece en Google/redes sociales |
| `metaDescription` | `textarea` | ✅ | Descripción meta |
| `ogImage` | `upload` → `media` | ❌ | Imagen para Open Graph (compartir en redes) |

**⚠️ ADVERTENCIA:** Estos campos **NO se usan en el frontend**. El `layout.tsx` tiene metadata hardcodeada. Es infraestructura lista para conectar.

---

## 📊 DASHBOARD (`/admin`)

**Archivo:** [`src/components/admin/Dashboard.tsx`](../src/components/admin/Dashboard.tsx)

**Para qué sirve:** Panel de inicio del admin. Muestra 6 tarjetas con contadores en tiempo real:

| Tarjeta | API consultada | Qué muestra |
|---|---|---|
| 📰 Noticias publicadas | `/api/news?limit=0` | `totalDocs` de noticias |
| 📺 Programas activos | `/api/programs?limit=0` | `totalDocs` de programas |
| 🎙️ Episodios totales | `/api/episodes?limit=0` | `totalDocs` de episodios |
| ✉️ Mensajes de contacto | `/api/contacts?limit=0` | `totalDocs` de mensajes |
| 🤝 Patrocinios activos | `/api/sponsorships?limit=0` | `totalDocs` de patrocinios |
| 📡 Transmisiones registradas | `/api/live?limit=0` | `totalDocs` de streams |

**⚠️ BUG:** "Programas activos" y "Patrocinios activos" muestran el total, no solo los activos (no filtra por `status=active`). Las APIs no incluyen el filtro en estas queries.

---

## 🔗 MAPA DE RELACIONES

```
Media ← logo, coverImage (Programs)
Media ← thumbnail (Episodes)
Media ← coverImage (News)
Media ← logo (Sponsorships)
Media ← thumbnail (Projects)
Media ← ogImage (SEO global)

Programs ← program (Episodes)      [1 programa → N episodios]
Programs ← program (Live)         [1 programa → N streams]

Categories ← categories (News)    [1 noticia → N categorías]

Services ← service (Projects)     [1 servicio → N proyectos]
```

---

## 🔑 MATRIZ DE PERMISOS

| Colección | read (público) | read (auth) | create | update | delete |
|---|---|---|---|---|---|
| **Users** | ❌ | Solo su perfil | Solo admin | Solo admin | Solo admin |
| **Media** | ✅ | ✅ | Auth | Auth | Auth |
| **Categories** | ✅ | ✅ | Auth | Auth | Auth |
| **Contacts** | ❌ | ✅ Auth | ✅ Público | Auth | Auth |
| **Programs** | ✅ | ✅ | Auth | Auth | Auth |
| **Episodes** | ✅ | ✅ | Auth | Auth | Auth |
| **News** | ✅ | ✅ | Auth | Auth | Auth |
| **Live** | ✅ | ✅ | Auth | Auth | Auth |
| **Sponsorships** | ✅ | ✅ | Auth | Auth | Auth |
| **Services** | ✅ | ✅ | Admin/Editor | Admin/Editor | Solo admin |
| **Projects** | ✅ | ✅ | Admin/Editor | Admin/Editor | Solo admin |
| **Settings** (global) | ✅ | ✅ | — | Solo admin | — |
| **SEO** (global) | ✅ | ✅ | — | Solo admin | — |

---

## 🐛 BUGS Y ADVERTENCIAS DETECTADOS

| # | Severidad | Descripción | Archivo |
|---|---|---|---|
| 1 | 🔴 | `?where[isActive][equals]=true` no funciona en checkbox (Payload v3). Workaround: fetch-all + filter. | Aplica a `Live`, `Services` |
| 2 | 🔴 | `?where[program.slug][equals]=X` no funciona en relaciones (Payload v3). Workaround: fetch-all + filter. | `Episodes` |
| 3 | 🟡 | `ServicesSection.tsx` tiene bugs: `live.titulo` en vez de `live.title`, `prog.descripcionCorta` en vez de `prog.description`. Además no se usa en ninguna página. | `ServicesSection.tsx` |
| 4 | 🟡 | Campos `isLive` y `liveUrl` en Programs son obsoletos — el sistema de "En Vivo" real usa la colección `Live`. | `Programs.ts` |
| 5 | 🟡 | Dashboard muestra totales, no filtrados por status active. | `Dashboard.tsx` |
| 6 | 🟡 | Globales `Settings` y `SEO` no están conectados al frontend (datos hardcodeados). | `Settings.ts`, `Seo.ts` |
| 7 | 🟡 | Categories no se usa en el frontend (relación existe pero no se filtra ni muestra). | `Categories.ts` |
| 8 | 🟡 | Sponsorship.url y Sponsorship.description no se renderizan en frontend. | `Sponsorships.ts` |
| 9 | 🟢 | Collections con group `"Contenido"` (Services, Projects) vs sin group (el resto). Inconsistencia visual en sidebar del admin. | `Services.ts`, `Projects.ts` |

---

## 🗂️ ESTRUCTURA DEL SIDEBAR EN EL ADMIN

```
📋 Dashboard (custom)
👤 Users
🖼️ Media
🏷️ Categories
✉️ Contacts
📺 Programs
🎙️ Episodes
📰 News
📡 Live
🤝 Sponsorships
📁 Contenido/
   ├── 🔧 Services
   └── 📁 Projects
⚙️ Settings (global)
🔍 SEO (global)
```

---

## 📝 SLUGS AUTOGENERADOS

Las siguientes colecciones generan slug automáticamente al crear/actualizar:

| Colección | De dónde toma el slug | Hook |
|---|---|---|
| Categories | `name` | `beforeChange` |
| Programs | `title` | `beforeChange` |
| Episodes | `title` | `beforeChange` |
| News | `title` | `beforeChange` |
| Sponsorships | `name` | `beforeChange` |
| Services | `title` | `beforeValidate` |
| Projects | `title` | `beforeValidate` |

---

## 🏁 RESUMEN: ¿Qué pasa cuando edito en el admin?

| Si edito en... | Se refleja en... |
|---|---|
| **Programs** | `/programas`, `/programas/[slug]`, `/portafolio`, Homepage |
| **Episodes** | `/programas/[slug]` (episodios del programa) |
| **News** | Homepage (últimas 3), `/noticias`, `/noticias/[slug]` |
| **Live** | Homepage (sección "En Vivo") |
| **Sponsorships** | `/patrocinios`, `/servicios/[slug]` (marquee) |
| **Services** | `/servicios`, `/servicios/[slug]` |
| **Projects** | `/servicios/[slug]` (sección "Trabajos realizados") |
| **Contacts** | Solo en el admin (bandeja de mensajes) |
| **Media** | Donde sea referenciada la imagen |
| **Users** | Solo en el admin |
| **Categories** | No usado en frontend aún |
| **Settings** | No usado en frontend aún |
| **SEO** | No usado en frontend aún |
