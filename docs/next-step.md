## ANÁLISIS RED RANGER — 2026-05-10

### Pregunta: ¿Cuál es el paso que sigue?

**Respuesta:** El siguiente paso obligatorio después de la re‑definición de colecciones es:

### ✅ PASO 7 — CENTINELA: Revisar los archivos nuevos

Antes de que LEANDRO ejecute backup y `generate:types`, CENTINELA debe revisar los siguientes archivos creados por LISANDRO:

1. `src/collections/Programs.ts`
2. `src/collections/Episodes.ts`
3. `src/collections/News.ts`
4. `src/collections/Live.ts`
5. `src/collections/Services.ts` (modificado)

**Objetivo:** Verificar que no haya errores de tipos, relaciones rotas, o inconsistencias con el `payload.config.ts`.

**Una vez CENTINELA apruebe**, LEANDRO ejecutará:
- Backup de PostgreSQL
- `npx payload generate:types`
- Verificación de admin

**Si CENTINELA rechaza**, LISANDRO debe corregir antes de continuar.

**RED RANGER** — APROBACIÓN: PENDIENTE DE REVISIÓN DE CENTINELA.
