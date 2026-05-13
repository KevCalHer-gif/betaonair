export default function EnVivoPage() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-brand)', color: '#c61d4a', fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        En Vivo
      </h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
      }}>
        <p style={{
          color: '#888',
          fontSize: '1.2rem',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '1.5rem' }}>📡</span>
          No hay transmisiones en vivo en este momento
        </p>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
        }}>
          <iframe
            src="https://www.youtube.com/embed/myyHYsOQQJE"
            title="Beta On Air - Último video"
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              border: 'none',
              display: 'block',
            }}
            allowFullScreen
          />
        </div>
      </div>
    </main>
  )
}
