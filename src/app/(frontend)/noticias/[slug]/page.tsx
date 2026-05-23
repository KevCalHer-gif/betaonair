import { notFound } from 'next/navigation'
import { getNewsBySlug } from '../../../../lib/api/news'
import Link from 'next/link'

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
    </main>
  )
}
