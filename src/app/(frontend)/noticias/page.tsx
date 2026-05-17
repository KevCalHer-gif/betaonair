'use client'
import NewsCard from '../../../components/ui/NewsCard'
import { noticias } from '../../../lib/data/noticias'

export default function NoticiasPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2rem',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Últimas Noticias
      </h1>
      {noticias.map((n) => (
        <NewsCard
          key={n.slug}
          titulo={n.titulo}
          fecha={n.fecha}
          slug={n.slug}
          resumen={n.resumen}
        />
      ))}
    </main>
  )
}
