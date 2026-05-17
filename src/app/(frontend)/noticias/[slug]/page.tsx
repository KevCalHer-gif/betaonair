import { notFound } from 'next/navigation'
import { noticias } from '../../../../lib/data/noticias'
import Link from 'next/link'

export default async function NoticiaSlugPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const noticia = noticias.find((n) => n.slug === slug)
  if (!noticia) notFound()

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
      <h1 style={{
        fontFamily: 'var(--font-brand)',
        color: '#c61d4a',
        fontSize: '2rem',
        marginBottom: '0.5rem',
      }}>
        {noticia.titulo}
      </h1>
      <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '2rem' }}>
        {noticia.fecha}
      </p>
      <p style={{
        color: '#aaa',
        fontSize: '1rem',
        marginBottom: '1.5rem',
        fontStyle: 'italic',
        borderLeft: '3px solid #c61d4a',
        paddingLeft: '1rem',
      }}>
        {noticia.resumen}
      </p>
      <div style={{ color: '#ccc', lineHeight: '1.9', fontSize: '1rem' }}>
        {noticia.contenido.split('\n').filter(Boolean).map((parrafo, idx) => (
          <p key={idx} style={{ marginBottom: '1rem' }}>{parrafo}</p>
        ))}
      </div>
    </main>
  )
}
