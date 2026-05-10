## ANÁLISIS RED RANGER — 2026-05-10

### Colección: services

**Campos propuestos:**
- título (text)
- descripción corta (textarea)
- descripción larga (rich text)
- icono (text)
- imagen principal (relación a media)
- orden (number)
- activo (checkbox / boolean)

### ANÁLISIS
**título**: obligatorio, único técnicamente no necesario pero sugerido para evitar duplicados; agregar `unique: true`.
**descripción corta**: long 300 char recomendada.

**descripción larga**: recomendado `minDoc:2` (2 párrafos). Podría separarse en bloques enriquecidos configurable. Acepto.

**icono**: simple string, sugerir valor por defecto "🔧" y limitar a 2 caracteres para emoji.

**imagen principal**: relación a media correcta. Asegurar almacenar alt desde media.

**orden**: campo opcional con `required: false`, `defaultValue: 0`.

**activo**: boolean.

### RIESGOS
1. No tener `unique: true` en título podría causar datos inconsistentes.
2. `descripción larga` usando rich text / JSON podría complicar búsquedas en Frontend; considerar también un campo de texto plano.
3. `orden` debe ser entero y permitir números negativos? Probablemente solo >=0.
4. La relación con media requiere que exista previamente la colección `media` (ya definida). Riesgo: no propagar eliminaciones. Sugiero `delete: cascade` en admin, opcional.
5. No se definieron bloqueos (admin group) ni acceso. Se asumirá acceso público lectura, autenticado escritura.

### DEPENDENCIAS
- Colección `media` debe existir (OK).
- Antes de generar tipos, ejecutar `npx payload generate:types` tras crear colección.

### PREGUNTAS ABIERTAS
- ¿Necesitamos slugs para la URL de servicios? (ruta `/servicios/[slug]`). Sugiero agregar campo `slug` autogenerado a partir de título.
- ¿La descripción larga debe soportar imágenes incrustadas? Si es rich text en Payload v3, por defecto sí; de lo contrario configurar en `fields`.
- ¿La colección debe estar accesible desde el admin bajo un grupo especial "Contenido"?

### APROBACIÓN: APROBADO CON AJUSTES
Se requiere agregar `unique: true` en título y considerar slug. Lisandro puede proceder con las correcciones sugeridas.
