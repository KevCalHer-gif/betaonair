# DECISIONS.md — Registro de decisiones arquitectónicas
> Este archivo solo crece. Nunca se reescribe ni se borra una entrada.
> Cada decisión tiene fecha, contexto, opciones consideradas y razón.
> Responsable de mantenerlo: RED RANGER al detectar nuevas decisiones.

---

## [001] Stack tecnológico principal
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** FIRME

**Decisión:**
Next.js 15 + Payload CMS v3 + PostgreSQL + Docker

**Contexto:**
Reemplazo del sitio actual de betaonair (HTML/CSS estático).
Proyecto de agencia con dominio conocido: servicios, portafolio, blog, contacto, admin.

**Opciones consideradas:**
- WordPress → descartado por PHP legacy, plugins caóticos, difícil de tipar
- Custom CMS con FastAPI desde cero → descartado por costo de desarrollo excesivo para este dominio
- Next.js + Payload CMS → seleccionado

**Razón:**
Payload CMS v3 es TypeScript nativo, genera tipos automáticamente, incluye admin panel,
y se integra directamente con Next.js sin una capa API separada.
El dominio del proyecto (sitio de agencia) no justifica construir un CMS desde cero.

---

## [002] Base de datos: PostgreSQL sobre MongoDB
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** FIRME

**Decisión:**
PostgreSQL como base de datos principal.

**Contexto:**
Payload CMS v3 soporta tanto PostgreSQL (via Drizzle ORM) como MongoDB.

**Opciones consideradas:**
- MongoDB → descartado por menor madurez del adaptador en Payload v3 y preferencia por datos relacionales
- PostgreSQL → seleccionado

**Razón:**
El modelo de datos del proyecto (servicios, proyectos, posts, categorías, usuarios)
es inherentemente relacional. PostgreSQL con Drizzle ORM en Payload v3 es la combinación
más estable para este tipo de dominio.

**Advertencia conocida:**
El adaptador PostgreSQL de Payload v3 es más nuevo que el adaptador MongoDB.
Verificar documentación oficial antes de cada migración.

---

## [003] Sin Redis en la fase inicial
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** REVISABLE en Fase 4

**Decisión:**
No incluir Redis en el stack inicial. Agregar solo si hay evidencia de necesidad.

**Contexto:**
El plan original incluía Redis para caché y sesiones.

**Razón:**
Para un desarrollador solo, cada servicio adicional es complejidad de debugging sin garantía
de beneficio. El tráfico inicial del sitio no justifica una capa de caché.
Payload maneja sesiones con JWT sin necesidad de Redis.
Revisar esta decisión cuando el sitio esté en producción con tráfico real.

---

## [004] CMS semi-estructurado, no page builder
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** FIRME

**Decisión:**
Páginas con campos tipados y específicos. Sin sistema de bloques tipo Elementor.

**Contexto:**
Se evaluó si implementar un CMS flexible con content blocks reutilizables.

**Opciones consideradas:**
- Page builder flexible (páginas → secciones → bloques) → descartado
- CMS rígido con campos fijos por colección → seleccionado como base
- CMS semi-estructurado (campos tipados + rich text para contenido libre) → seleccionado

**Razón:**
El equipo de betaonair edita textos, imágenes y publica posts.
No reconfigura el layout del homepage semanalmente.
Un page builder agrega semanas de desarrollo para funcionalidad que no se usará.
El rich text de Payload (Lexical editor) cubre las necesidades editoriales del blog.

---

## [005] Sin FastAPI en fase inicial
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** REVISABLE si aparecen funciones de IA o automatización

**Decisión:**
No incluir FastAPI. Payload CMS v3 maneja la API REST y el admin.

**Contexto:**
El plan original contemplaba FastAPI como backend separado.

**Razón:**
Para el dominio actual (sitio de agencia + CMS), Payload cubre:
autenticación, API REST, admin panel, gestión de media, roles y permisos.
FastAPI agrega una capa extra de mantenimiento sin valor inmediato.
Reconsiderar si se implementan funciones de IA (chatbot, automatizaciones),
donde FastAPI como servicio separado sí tendría justificación.

---

## [006] Monolito modular, no microservicios
**Fecha:** 2025-01
**Decidido por:** RED RANGER
**Estado:** FIRME para todo el proyecto

**Decisión:**
Arquitectura de monolito modular. Un solo repositorio, un solo deploy principal.

**Razón:**
Desarrollador solo. Los microservicios agregan complejidad operacional
(service discovery, comunicación entre servicios, distributed tracing)
que no se justifica para este tamaño de proyecto.
La modularidad se logra a nivel de carpetas y colecciones dentro del monolito.

---

## [007] Sistema de roles para el agente IA
**Fecha:** 2025-01
**Decidido por:** Equipo
**Estado:** FIRME

**Decisión:**
Cuatro roles en el agente: RED RANGER (analista), LISANDRO (desarrollador),
CENTINELA (revisor), LEANDRO (implementador + documentador).

**Razón:**
Evitar que el agente mezcle tipos de tareas y genere inconsistencias.
Cada rol tiene responsabilidades y restricciones explícitas.
El flujo RED RANGER → LISANDRO → CENTINELA → LEANDRO crea una puerta de calidad
antes de que cualquier código llegue al repositorio o al servidor.

## [008] Implementación de página /programas con datos hardcodeados
**Fecha:** 2026-05-12
**Decidido por:** RED RANGER
**Estado:** APROBADO

**Decisión:**
Se aprueba la implementación de la página `/programas` (listado de hasta 5 programas) y la página de detalle `/programas/[slug]` utilizando logos desde `public/images/programas/` y datos hardcodeados, como paso temporal antes de conectar con Payload CMS.

**Contexto:**
La página actual de programas redirige a "/" y no muestra contenido real. Los avatares de los programas (logos) se encuentran en `public/images/programas/`. Cuando el CMS esté listo, se migrarán los datos.

**Opciones consideradas:**
- Esperar a que Payload esté conectado → descartado por retrasar la experiencia de usuario
- Usar datos hardcodeados → seleccionado, con compromiso de migrar después

**Razón:**
Acelera la entrega de funcionalidad visible sin depender del backend de Payload. Los datos son estáticos y simples de mantener. El logo de cada programa estará en `/images/programas/[slug].png` por convención.

**Riesgo conocido:**
- Al conectar Payload, se deberá reemplazar el contenido estático con llamadas API, manteniendo la misma estructura de rutas.
## [009] Servicios profesionales coexisten con patrocinios
**Fecha:** 2026-05-17
**Decidido por:** Equipo
**Estado:** FIRME

**Decisión:**
La ruta /servicios se mantiene y ofrece servicios profesionales:
diseño gráfico, producción audiovisual, producción de podcast y streaming para clientes externos.
NO se elimina. Coexiste con /patrocinios.

**Distinción clave:**
- /servicios → lo que Beta On Air produce PARA clientes (agencia)
- /patrocinios → marcas que quieren aparecer EN el canal (publicidad)