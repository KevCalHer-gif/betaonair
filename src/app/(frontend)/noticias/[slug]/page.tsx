'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { getNewsBySlug } from '@/lib/api/news'
type News = { id: string; title: string; content?: any; slug?: string; publishedAt?: string }

export default function NoticiaDetailPage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<News | null>(null)

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      getNewsBySlug(slug).then(setArticle)
    }
  }, [slug])

  if (!article) {
    return <p style={{ color: '#fff', padding: '2rem' }}>Cargando...</p>
  }

  return (
    <div style={{ padding: '2rem', color: '#fff', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{article.title}</h1>
      {article.content?.root?.children?.map((node: any, idx: number) => {
        if (node.type === 'paragraph') {
          return <p key={idx}>{node.children?.map((c: any) => c.text).join('')}</p>
        }
        return null
      })}
    </div>
  )
}
