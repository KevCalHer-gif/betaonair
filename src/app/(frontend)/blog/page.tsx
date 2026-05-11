'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getNews } from '@/lib/api/news'
import type { News } from '@/payload-types'

export default function BlogListPage() {
  const [news, setNews] = useState<News[]>([])

  useEffect(() => {
    getNews().then(setNews)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Blog / Noticias</h1>
      {news.length === 0 ? (
        <p>Cargando noticias...</p>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))' }}>
          {news.map(item => (
            <div key={item.id} style={{ background: '#1a1a1a', padding: '1.5rem', borderRadius: '8px' }}>
              <h2>{item.title}</h2>
              <Link href={`/blog/${item.slug}`} style={{ color: '#c61d4a', textDecoration: 'none' }}>
                Leer →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
