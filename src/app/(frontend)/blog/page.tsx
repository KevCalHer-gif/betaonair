'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getPosts } from '../../../lib/api/posts'
import type { Post } from '../../../payload-types'

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    getPosts().then(setPosts)
  }, [])

  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h1>Blog</h1>
      {posts.map((post) => (
        <article key={post.id} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #333' }}>
          <Link href={`/blog/${post.slug}`} style={{ color: '#c61d4a', textDecoration: 'none' }}>
            <h2>{post.title}</h2>
          </Link>
          {post.excerpt && <p>{post.excerpt}</p>}
        </article>
      ))}
    </div>
  )
}
