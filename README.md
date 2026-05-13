# Beta On Air

Plataforma de streaming en vivo, podcasts y programas propios con gestión de contenido mediante Payload CMS.

## Tecnologías

- **Next.js** (App Router)
- **Payload CMS** 3.0
- **PostgreSQL**
- **Docker / docker‑compose**
- **TypeScript**

## Instalación

1. Clonar el repositorio.
2. Copiar `.env.example` a `.env` y ajustar variables.
3. Ejecutar `docker compose up -d` para PostgreSQL.
4. Ejecutar `npm install`.
5. Iniciar Payload con `npm run dev`.
6. Acceder a `http://localhost:3000/admin` y crear usuario administrador.

## Comandos habituales

| Comando              | Descripción                                        |
|----------------------|----------------------------------------------------|
| `npm run dev`        | Levanta servidor de desarrollo (Next.js + Payload) |
| `npm run build`      | Build de producción                                |
| `npm run payload generate:types` | Generar tipos TypeScript a partir de la configuración |
| `docker compose up -d` | Levantar base de datos PostgreSQL                |

## Colecciones

- **Programs** – programas propios del canal
- **Episodes** – episodios asociados a programas
- **News** – noticias
- **Live** – streams en vivo
- **Categories** – categorías
- **Contacts** – formulario de contacto
