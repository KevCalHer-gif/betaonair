# GLOSSARY.md — Glosario del proyecto
> Fuente de verdad para nombres de colecciones, variables, rutas y convenciones.
> El agente SIEMPRE consulta este archivo antes de nombrar cualquier cosa.
> Si un nombre no está aquí, RED RANGER debe aprobarlo antes de usarlo.
> Responsable de mantenerlo: RED RANGER al aprobar nuevas entidades.

---

## Colecciones de Payload CMS

| Nombre en código       | Nombre en admin     | Descripción                                 |
|------------------------|---------------------|---------------------------------------------|
| `services`             | Servicios           | Servicios que ofrece la agencia             |
| `projects`             | Proyectos           | Trabajos del portafolio                     |
| `posts`                | Blog                | Artículos del blog                          |
| `categories`           | Categorías          | Categorías para posts y proyectos           |
| `testimonials`         | Testimonios         | Opiniones de clientes                       |
| `contacts`             | Contactos           | Mensajes recibidos del formulario           |
| `users`                | Usuarios            | Usuarios del sistema (viene con Payload)    |
| `media`                | Multimedia          | Archivos de imagen y video (viene con Payload) |

---

## Globals de Payload CMS

| Nombre en código       | Descripción                                          |
|------------------------|------------------------------------------------------|
| `settings`             | Configuración general del sitio (nombre, logo, redes)|
| `seo`                  | Configuración SEO global (meta defaults)             |

---

## Roles de usuarios en el sistema

| Nombre en código  | Descripción                                      |
|-------------------|--------------------------------------------------|
| `admin`           | Acceso total al sistema                          |
| `editor`          | Puede crear y editar contenido, no puede borrar usuarios |
| `viewer`          | Solo lectura del admin (para revisión de contenido) |

---

## Estados de contenido

| Estado        | Código          | Aplica a                    |
|---------------|-----------------|-----------------------------|
| Borrador      | `draft`         | posts, projects             |
| En revisión   | `review`        | posts                       |
| Publicado     | `published`     | posts, projects, services   |
| Archivado     | `archived`      | posts, projects             |

---

## Rutas del frontend (Next.js)

| Ruta pública        | Archivo                                  | Descripción             |
|---------------------|------------------------------------------|-------------------------|
| `/`                 | `src/app/page.tsx`                       | Homepage                |
| `/servicios`        | `src/app/servicios/page.tsx`             | Listado de servicios    |
| `/portafolio`       | `src/app/portafolio/page.tsx`            | Listado de proyectos    |
| `/portafolio/[slug]`| `src/app/portafolio/[slug]/page.tsx`     | Detalle de proyecto     |
| `/blog`             | `src/app/blog/page.tsx`                  | Listado de posts        |
| `/blog/[slug]`      | `src/app/blog/[slug]/page.tsx`           | Detalle de post         |
| `/contacto`         | `src/app/contacto/page.tsx`              | Formulario de contacto  |

---

## Estructura de carpetas del proyecto

```
betaonair/
├── src/
│   ├── app/                  # Páginas Next.js (App Router)
│   ├── collections/          # Colecciones de Payload CMS
│   ├── globals/              # Globals de Payload CMS
│   ├── components/           # Componentes React reutilizables
│   │   ├── ui/               # Componentes base (botones, cards, inputs)
│   │   └── sections/         # Secciones de página (hero, servicios, etc.)
│   ├── lib/                  # Utilidades y funciones de acceso a datos
│   │   └── api/              # Funciones tipadas para llamar a Payload
│   └── styles/               # Estilos globales
├── public/                   # Archivos estáticos
├── BRAIN.md                  # Estado del proyecto (este sistema)
├── DECISIONS.md              # Registro de decisiones arquitectónicas
├── PROGRESS.md               # Historial de progreso
├── GLOSSARY.md               # Este archivo
├── docker-compose.yml        # Servicios locales (PostgreSQL)
├── .env                      # Variables de entorno (no va a Git)
├── .env.example              # Template de variables (sí va a Git)
└── payload.config.ts         # Configuración principal de Payload
```

---

## Variables de entorno

| Variable                  | Descripción                                    | Ejemplo                        |
|---------------------------|------------------------------------------------|--------------------------------|
| `DATABASE_URI`            | Conexión a PostgreSQL                          | `postgresql://admin:pass@localhost:5432/betaonair_db` |
| `PAYLOAD_SECRET`          | Clave secreta de Payload (mínimo 32 chars)     | `una-clave-muy-larga-y-segura` |
| `NEXT_PUBLIC_SITE_URL`    | URL pública del sitio                          | `https://betaonair.com` |
| `NEXT_PUBLIC_API_URL`     | URL base de la API de Payload                  | `http://localhost:3000`        |

---

## Convenciones de nombrado

| Tipo                   | Convención              | Ejemplo                        |
|------------------------|-------------------------|--------------------------------|
| Archivos de colección  | PascalCase              | `Services.ts`, `BlogPosts.ts`  |
| Componentes React      | PascalCase              | `ServiceCard.tsx`, `HeroSection.tsx` |
| Funciones utilitarias  | camelCase               | `getPublishedPosts()`          |
| Variables de entorno   | UPPER_SNAKE_CASE        | `DATABASE_URI`                 |
| Slugs y URLs           | kebab-case              | `/portafolio/proyecto-nombre`  |
| Ramas de Git           | kebab-case              | `feat/coleccion-services`      |
| Mensajes de commit     | Convencional en español | `feat(collections): agregar colección services` |

---

## Tipos de commit permitidos

| Tipo       | Cuándo usarlo                                      |
|------------|----------------------------------------------------|
| `feat`     | Nueva funcionalidad                                |
| `fix`      | Corrección de bug                                  |
| `docs`     | Solo documentación                                 |
| `style`    | Formato, sin cambios de lógica                     |
| `refactor` | Refactorización sin nueva funcionalidad ni fix     |
| `chore`    | Tareas de mantenimiento (deps, config)             |
| `test`     | Agregar o corregir tests                           |

---

## Términos del dominio

| Término en el negocio | Nombre en el código | Notas                              |
|-----------------------|---------------------|------------------------------------|
| Trabajo / Proyecto    | `project`           | Item del portafolio                |
| Artículo / Nota       | `post`              | Item del blog                      |
| Servicio              | `service`           | Lo que ofrece la agencia           |
| Cliente               | `client`            | Campo dentro de `project`          |
| Testimonio            | `testimonial`       | Opinión de cliente                 |
| Mensaje de contacto   | `contact`           | Formulario del sitio               |
