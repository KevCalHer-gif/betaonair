import { getNewsBySlug } from '../../../../lib/api/news'
import { notFound } from 'next/navigation'

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

export default async function NoticiaSlugPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const noticia = await getNewsBySlug(params.slug) as unknown as NewsItem | null
  if (!noticia) notFound()

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
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '1rem' }}>
        {noticia.title}
      </h1>
      {noticia.publishedAt && (
        <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {new Date(noticia.publishedAt).toLocaleDateString('es-BO')}
        </p>
      )}
      <div style={{ color: '#ccc', lineHeight: '1.8' }}>
        {noticia.excerpt || (noticia.content?.root?.children?.map((child: any, idx: number) => {
          if (child.type === 'paragraph') {
            return <p key={idx}>{child.children?.map((c: any) => c.text).join('')}</p>
          }
          return null
        }))}
      </div>
    </main>
  )
}
