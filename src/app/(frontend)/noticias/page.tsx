import NewsCard from '../../../components/ui/NewsCard'
import { getNews } from '../../../lib/api/news'

export const dynamic = 'force-dynamic'

export default async function NoticiasPage() {
  const noticias = await getNews()

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
      {noticias.length === 0 ? (
        <p style={{ color: '#555', textAlign: 'center', padding: '2rem 0', fontStyle: 'italic' }}>
          No hay noticias publicadas aún.
        </p>
      ) : (
        noticias.map((n) => {
          const cats = (n.categories as any[] | undefined)?.map((c: any) => ({
            id: c.id,
            name: c.name,
            color: c.color,
          })) || []
          return (
            <NewsCard
              key={n.id}
              titulo={n.title}
              fecha={
                n.publishedAt
                  ? new Date(n.publishedAt).toLocaleDateString('es-BO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''
              }
              slug={n.slug || ''}
              resumen={n.excerpt || ''}
              categories={cats}
            />
          )
        })
      )}
    </main>
  )
}
