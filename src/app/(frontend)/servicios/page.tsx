import React from 'react'
import Link from 'next/link'
import { getServices } from '../../../lib/api/services'

/**
 * Extrae texto plano de la estructura JSON de richText (Lexical) de Payload.
 * Recorre recursivamente los children y concatena los nodos de texto.
 */
function extractPlainText(richText: any): string {
  if (!richText) return ''
  try {
    const root = richText.root || richText
    const children = root.children || []
    return children
      .map((block: any) => {
        if (block.children) {
          return block.children.map((child: any) => child.text || '').join('')
        }
        return ''
      })
      .join(' ')
      .trim()
  } catch {
    return ''
  }
}

export default async function ServiciosPage() {
  const servicios = await getServices()

  return (
    <main style={{ minHeight: '100vh', padding: '3rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>
        Servicios
      </h1>
      <p style={{ color: '#888', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
        Transformamos tus ideas en contenido de alto impacto. Conocé lo que podemos hacer por tu marca o proyecto.
      </p>

      {servicios.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center', padding: '3rem 0' }}>
          No hay servicios disponibles en este momento.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {servicios.map((s) => (
            <Link key={s.id} href={`/servicios/${s.slug}`} style={{ textDecoration: 'none', background: '#0a0a0a', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}>
              <h3 style={{ color: '#c61d4a', fontSize: '1.1rem', marginBottom: '0.75rem', textAlign: 'center' }}>
                {s.title}
              </h3>

              {s.description && (
                <p style={{ color: '#888', fontSize: '0.85rem', margin: '0 0 1rem', lineHeight: '1.5' }}>
                  {extractPlainText(s.description)}
                </p>
              )}

              {s.features && s.features.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem', color: '#aaa', fontSize: '0.8rem' }}>
                  {s.features.map((f, i) => (
                    <li key={f.id || i} style={{ padding: '0.3rem 0', borderBottom: '1px solid #1a1a1a' }}>
                      ✓ {f.feature}
                    </li>
                  ))}
                </ul>
              )}

              {s.price != null && s.price > 0 && (
                <p style={{ color: '#c61d4a', fontWeight: '700', fontSize: '1.1rem', margin: '0.75rem 0 0', textAlign: 'center' }}>
                  Bs. {s.price.toLocaleString()}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/contacto" style={{ background: '#c61d4a', color: '#fff', padding: '0.75rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.06em' }}>
          Solicita una cotización
        </Link>
      </div>
    </main>
  )
}
