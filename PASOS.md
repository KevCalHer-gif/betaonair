# PASOS DETALLADOS PARA LISANDRO (orden de prioridad)

## 1. LAYOUT GLOBAL (nav + footer)

**Archivo:** `src/app/(frontend)/layout.tsx` (ya existe)

**Acción:** Asegurar que el layout renderice un `<nav>` global y un `<footer>` antes del `{children}`.
El `<nav>` debe contener enlaces a: HOME (`/`), PROGRAMAS (`/programas`), EN VIVO (`/en-vivo`), NOTICIAS (`/noticias`), CONTACTO (`/contacto`), PATROCINIOS (`/patrocinios`).
El `<footer>` debe mostrar texto simple "Beta On Air © 2026" y enlaces a redes sociales (placeholder).

**Código exacto a insertar (reemplazar todo el contenido de `return ( ... )` en `layout.tsx`):**

```tsx
return (
  <html lang="es" style={{background:'transparent'}}>
    <body style={{background:'transparent', margin:0, padding:0}}>
      <nav style={{
        position:'sticky', top:0, zIndex:100,
        background:'rgba(0,0,0,0.85)', backdropFilter:'blur(6px)',
        padding:'0.75rem 2rem', display:'flex', gap:'1.5rem',
        alignItems:'center', justifyContent:'center', flexWrap:'wrap'
      }}>
        {[
          {href:'/', label:'Inicio'},
          {href:'/programas', label:'Programas'},
          {href:'/en-vivo', label:'En Vivo'},
          {href:'/noticias', label:'Noticias'},
          {href:'/patrocinios', label:'Patrocinios'},
          {href:'/contacto', label:'Contacto'}
        ].map(link => (
          <Link key={link.href} href={link.href} style={{color:'#f0f0f0',textDecoration:'none',fontSize:'0.9rem',fontWeight:500}}>
            {link.label}
          </Link>
        ))}
      </nav>
      <main>{children}</main>
      <footer style={{textAlign:'center',padding:'2rem 1rem',color:'#555',fontSize:'0.8rem',borderTop:'1px solid #222'}}>
        Beta On Air © 2026 &nbsp;|&nbsp; <span style={{color:'#888'}}>Seguinos en YouTube, TikTok e Instagram</span>
      </footer>
      <canvas id="bg" style={{position:'fixed',top:0,left:0,zIndex:-1}}/>
    </body>
  </html>
)
```

**Verificación:** La página principal debe mostrar barra de navegación superior y footer al final. No deben aparecer duplicados.

---

## 2. PÁGINA DE CONTACTO – INTEGRAR ENVÍO ANÓNIMO

**Archivo:** `src/app/(frontend)/contacto/page.tsx` (ya existe con formulario)

**Acción:** Asegurar que el formulario envíe POST a `/api/contacts` con los campos: `name`, `email`, `message`. La colección `contacts` ya tiene `access.create: () => true` (verificar en `src/collections/Contacts.ts`). Si no, añadirlo.

**Agregar lógica de envío (dentro del `onSubmit`):**

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setEnviando(true)
  setMensaje('')
  try {
    const res = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, email, message: mensaje })
    })
    if (!res.ok) throw new Error('Error al enviar')
    setNombre(''); setEmail(''); setMensaje('')
    setMensaje('Mensaje enviado con éxito. Gracias.')
  } catch {
    setMensaje('Hubo un error. Inténtalo de nuevo.')
  } finally {
    setEnviando(false)
  }
}
```

**Precaución:** No modificar el estado del formulario que no existe. Asegurarse de importar `useState` y tener las variables de estado correctas.

---

## 3. PÁGINA DE SERVICIOS (`/servicios`)

**Archivo:** `src/app/(frontend)/servicios/page.tsx` – puede que no exista. Crear nuevo componente:

```tsx
import React from 'react'

export default function ServiciosPage() {
  const servicios = [
    { icono: '🎬', titulo: 'Producción Audiovisual', descripcion: 'Creamos contenido de video profesional para tu marca, desde spots hasta documentales.' },
    { icono: '🎙️', titulo: 'Podcast', descripcion: 'Producimos y distribuimos podcasts con calidad de estudio y narrativa atractiva.' },
    { icono: '📡', titulo: 'Streaming en Vivo', descripcion: 'Transmitimos eventos en vivo con múltiples cámaras y audio profesional.' },
    { icono: '🎨', titulo: 'Diseño Gráfico', descripcion: 'Diseñamos identidad visual, piezas digitales y material promocional para redes.' },
  ]

  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Servicios
      </h1>
      <p style={{ color: '#888', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Transformamos tus ideas en contenido de alto impacto. Conocé lo que podemos hacer por tu marca o proyecto.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {servicios.map((s) => (
          <div key={s.titulo} style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{s.icono}</div>
            <h3 style={{ color: '#c61d4a', fontSize: '1rem', marginBottom: '0.5rem' }}>{s.titulo}</h3>
            <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>{s.descripcion}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
```

---

## 4. PÁGINA DE PORTAFOLIO – MOSTRAR PROGRAMAS DESTACADOS

**Archivo:** `src/app/(frontend)/portafolio/page.tsx` – actualmente redirige a `/programas`. Reemplazar contenido con una lista de programas destacados usando datos de `src/lib/data/programas.ts`.

```tsx
import { programas } from '../../../lib/data/programas'
import Image from 'next/image'
import Link from 'next/link'

export default function PortafolioPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Portafolio
      </h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Conocé nuestros programas más destacados de Beta On Air.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {programas.map((prog) => (
          <Link key={prog.slug} href={`/programas/${prog.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', transition: 'border-color 0.3s ease' }}
                 onMouseEnter={e => e.currentTarget.style.borderColor = '#c61d4a'}
                 onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}>
              <Image src={prog.logo} alt={prog.nombre} width={200} height={200} style={{ objectFit: 'contain', height: '120px', width: 'auto', marginBottom: '1rem' }} />
              <h3 style={{ color: '#c61d4a', fontSize: '1rem', marginBottom: '0.5rem' }}>{prog.nombre}</h3>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{prog.descripcion}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
```

---

## 5. DATOS SEMILLA (SEED) PARA PAYLOAD

**Archivo nuevo:** `src/seed/index.ts`

Crea un script que inserte datos de prueba en las colecciones `programs`, `episodes`, `news`, `live`. Ejecutar una sola vez después del deploy usando:

```bash
npx tsx src/seed/index.ts
```

**Contenido sugerido (resumido):** Insertar un programa "Beta Kids", dos episodios con `embedUrl`, una noticia, y un stream en vivo activo. No modificar nada existente.

---

## 6. BUILD DE PRODUCCIÓN Y VERIFICACIÓN FINAL

**Comando:** `npm run build`

Luego ejecutar `npm run start` y probar manualmente todas las rutas.

**Si falla:** Revisar errores de TypeScript en los archivos modificados, corregirlos y repetir.

---

## IMPORTANTE: NO TOCAR NINGÚN OTRO ARCHIVO FUERA DE LOS MENCIONADOS

- No modificar `src/lib/data/programas.ts` (ya correcto)
- No modificar `src/lib/data/noticias.ts`
- No modificar `src/app/(frontend)/programas/[slug]/page.tsx`
- No modificar `src/app/(frontend)/noticias/page.tsx`
- No modificar `src/app/(frontend)/noticias/[slug]/page.tsx`
- No modificar `package.json` ni `PROMPT.txt` ni `BRAIN.md` ni `PROGRESS.md`
