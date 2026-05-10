## ANÁLISIS RED RANGER — 2026-05-10

### Colección: projects

**Campos propuestos:**
- título (text)
- slug (text, autogenerado)
- cliente (text)
- descripción corta (textarea)
- descripción larga (richText lexical)
- categoría (relación a categories)
- imágenes (array de relaciones a media)
- url externa (text)
- estado (select: draft/published/archived)
- orden (number)
- destacado (boolean)

### ANÁLISIS

**título**: required, unique según lo habitual.

**slug**: autogenerado desde título, unique, sidebar. Good.

**cliente**: optional.

**descripción corta**: max length 250.

**descripción larga**: identical to services.

**categoría**: hasMany `false` (single category). Si se desea múltiples, cambiar a `hasMany: true`. Requiere colección categories existente; crearla antes o en paralelo.

**imágenes**: sugerimos usar `type: 'relationship'` con `hasMany: true`, en lugar de array complejo, a menos que necesites metadatos por imagen. Riesgo: sin metadatos alternativos solo IDs.

**url externa**: optional, validar formato URL en server side hook? Puede omitirse.

**estado**: usar campo `select` con opciones `draft`, `published`, `archived`. Valor por defecto `draft`. Acceso: lectura pública solo si estado `published`, de lo contrario denegar (usar hook de acceso).

**orden**: defaultValue 0.

**destacado**: boolean por defecto false.

### RIESGOS

1. **Dependencia de categories**: la colección categories aún no existe. Se debe crear y registrar en payload.config.ts antes o simultáneamente con projects; de otro modo Payload arrojará error de relación inválida.
2. **Acceso a contenido**: Si no se restringe visibilidad según `estado`, los borradores podrían ser accesibles públicamente. Se requiere hook de acceso (`beforeRead`) que filtre según estado.
3. **imágenes con metadatos**: la relación directa sin array impide almacenar leyendas o texto alternativo por imagen. Si no se requiere, está bien.
4. **URL externa sin validación**: podría recibir valores inválidos. Puede agregarse hook de `validate` para validar formato URL.
5. **Orden negativo**: debe restringirse a >=0 con validación en campo.

### DEPENDENCIAS

- Colección `categories` (debe ser creada y registrada).
- Colección `media` (ya existente).

### PREGUNTAS ABIERTAS

- ¿La categoría permite múltiples por proyecto? La propuesta dice "categoría (relación a categories)" (singular). Confirmar.
- ¿Necesitamos un array de imágenes con metadatos opcionales (alt, posición)?
- ¿Estado `draft` debe ser editable solo por usuarios autenticados? Si solo visibilidad, hook de acceso es suficiente.

### APROBACIÓN: APROBADO CON AJUSTES

Se debe crear la colección `categories` antes de `projects` y ajustar visibilidad según estado. Se sugiere usar relación `hasMany` para imágenes (o subarray según necesidades). Lisandro puede proceder con las correcciones indicadas.
