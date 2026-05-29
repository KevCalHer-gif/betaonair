import { notFound } from 'next/navigation'
import { getNewsBySlug } from '../../../../lib/api/news'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

/**
 * Extrae texto plano de la estructura richText (Lexical) de Payload.
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

/**
 * Extrae párrafos individuales de la estructura richText (Lexical) de Payload.
 */
function extractParagraphs(richText: any): string[] {
  if (!richText) return []
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
      .filter((p: string) => p.trim() !== '')
  } catch {
    return []
  }
}

export default async function NoticiaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const noticia = await getNewsBySlug(slug)
  if (!noticia) notFound()

  const coverRaw = noticia.coverImage as { url?: string; alt?: string } | null | undefined
  const coverUrl = coverRaw?.url || null
  const coverAlt = coverRaw?.alt || noticia.title
  const parrafos = extractParagraphs(noticia.content)

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link
        href="/noticias"
        style={{
          color: '#c61d4a',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        ← Volver a noticias
      </Link>
      {coverUrl && (
        <div style={{
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          <img
            src={coverUrl}
            alt={coverAlt}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      )}
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2rem',
          marginBottom: '0.5rem',
        }}
      >
        {noticia.title}
      </h1>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2rem' }}>
        {noticia.publishedAt
          ? new Date(noticia.publishedAt).toLocaleDateString('es-BO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : ''}
      </p>
      {noticia.categories && Array.isArray(noticia.categories) && (noticia.categories as any[]).length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {(noticia.categories as any[]).map((cat: any, idx: number) => (
            <span
              key={cat.id || idx}
              style={{
                display: 'inline-block',
                padding: '0.3rem 0.8rem',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                background: cat.color || '#c61d4a',
                color: '#fff',
              }}
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}
      {noticia.excerpt && (
        <p
          style={{
            color: '#aaa',
            fontSize: '1rem',
            marginBottom: '1.5rem',
            fontStyle: 'italic',
            borderLeft: '3px solid #c61d4a',
            paddingLeft: '1rem',
          }}
        >
          {noticia.excerpt}
        </p>
      )}
      <div style={{ color: '#ccc', lineHeight: '1.9', fontSize: '1rem' }}>
        {parrafos.length > 0 ? (
          parrafos.map((parrafo, idx) => (
            <p key={idx} style={{ marginBottom: '1rem' }}>
              {parrafo}
            </p>
          ))
        ) : (
          <p>{extractPlainText(noticia.content)}</p>
        )}
      </div>

      {/* Fuente de la noticia */}
      {noticia.sourceName && (
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #222',
          color: '#888',
          fontSize: '0.85rem',
          fontStyle: 'italic',
        }}>
          Fuente:{' '}
          {noticia.sourceUrl ? (
            <a
              href={noticia.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#c61d4a', textDecoration: 'underline' }}
            >
              {noticia.sourceName}
            </a>
          ) : (
            <span style={{ color: '#ccc' }}>{noticia.sourceName}</span>
          )}
        </div>
      )}
    </main>
  )
}
