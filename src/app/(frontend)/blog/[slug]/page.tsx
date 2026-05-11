'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPostBySlug } from '../../../../lib/api/posts'
import type { Post } from '../../../../payload-types'

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (slug) {
      getPostBySlug(slug as string).then(setPost)
    }
  }, [slug])

  if (!post) {
    return <div style={{ padding: '2rem', color: '#fff' }}>Cargando...</div>
  }

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>{post.title}</h1>
      {post.excerpt && <p style={{ color: '#aaa' }}>{post.excerpt}</p>}
      {post.content && (
        <div style={{ lineHeight: 1.8 }}>
          <RichText data={post.content} />
        </div>
      )}
    </div>
  )
}
