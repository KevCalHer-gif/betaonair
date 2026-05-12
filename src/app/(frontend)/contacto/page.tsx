'use client'

import { useState, FormEvent } from 'react'

export default function ContactoPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [exito, setExito] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setEnviando(true)
    setError('')
    setExito(false)
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje }),
      })
      if (!res.ok) throw new Error('Error al enviar el mensaje')
      setExito(true)
      setNombre('')
      setEmail('')
      setMensaje('')
    } catch (err: any) {
      setError(err.message || 'Error inesperado')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{ padding: '2rem', color: '#f0f0f0', maxWidth: 600, margin: '0 auto' }}>
      <h1>Contacto</h1>
      {exito && <p style={{ color: '#4caf50' }}>Mensaje enviado correctamente.</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={{ padding: '0.5rem', background: '#111', color: '#f0f0f0', border: '1px solid #333' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '0.5rem', background: '#111', color: '#f0f0f0', border: '1px solid #333' }}
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          rows={5}
          style={{ padding: '0.5rem', background: '#111', color: '#f0f0f0', border: '1px solid #333', resize: 'vertical' }}
        />
        <button
          type="submit"
          disabled={enviando}
          style={{
            background: '#c61d4a',
            color: '#fff',
            padding: '0.75rem',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      {error && <p style={{ color: '#f44336' }}>{error}</p>}
    </div>
  )
}
