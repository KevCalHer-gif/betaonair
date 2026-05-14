'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getNewsBySlug } from '../../../../lib/api/news'

interface NewsItem {
  id: number
  title: string
  slug?: string | null
  excerpt?: string | null
  content?: {
    root: {
      type: string
      children: Array<{
        type: string
        children?: Array<{ text: string }>
        text?: string
      }>
    }
  } | null
  publishedAt?: string | null
}

function renderLexical(node: any): React.ReactNode {
  if (!node) return null

  if (typeof node?.text === 'string') {
    return <span>{node.text}</span>
  }

  if (Array.isArray(node?.children)) {
    return (
      <>
        {node.children.map((child: any, idx: number) => (
          <React.Fragment key={idx}>{renderLexical(child)}</React.Fragment>
        ))}
      </>
    )
  }

  switch (node?.type) {
    case 'paragraph':
      return <p>{renderLexical(node)}</p>
    case 'heading': {
      const Tag = node?.tag || 'h2'
      return <Tag>{renderLexical(node)}</Tag>
    }
    case 'text':
      return renderLexical(node)
    default:
      if (node?.text) return <span>{node.text}</span>
      return null
  }
}

export default function NoticiaSlugPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [noticia, setNoticia] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getNewsBySlug(slug)
        if (!data) {
          setError('Noticia no encontrada.')
          return
        }
        setNoticia(data as unknown as NewsItem)
      } catch (err: any) {
        console.error('Error loading news:', err)
        setError('Error al cargar la noticia.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: '#aaa' }}>Cargando noticia…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: '#f44336' }}>{error}</p>
      </main>
    )
  }

  if (!noticia) {
    return (
      <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
        <p style={{ color: '#aaa' }}>Noticia no encontrada.</p>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <a
        href="/noticias"
        style={{
          color: '#c61d4a',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        ← Volver a noticias
      </a>
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
      {noticia.publishedAt && (
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {new Date(noticia.publishedAt).toLocaleDateString('es-BO')}
        </p>
      )}
      {noticia.content ? (
        <div style={{ color: '#ccc', fontSize: '1rem', lineHeight: '1.6' }}>
          {renderLexical(noticia.content.root)}
        </div>
      ) : (
        <p style={{ color: '#888' }}>Contenido no disponible.</p>
      )}
    </main>
  )
}
