'use client'

import { useState } from 'react'

export default function ContactoPage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: enviar a API o servicio externo
    alert('Mensaje enviado (simulación)')
  }

  return (
    <div style={{ padding: '2rem', color: '#fff', maxWidth: 600, margin: '0 auto' }}>
      <h1>Contacto</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ padding: '0.5rem', background: '#111', color: '#fff', border: '1px solid #333' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', background: '#111', color: '#fff', border: '1px solid #333' }}
        />
        <textarea
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          rows={5}
          style={{ padding: '0.5rem', background: '#111', color: '#fff', border: '1px solid #333', resize: 'vertical' }}
        />
        <button
          type="submit"
          style={{
            background: '#c61d4a',
            color: '#fff',
            padding: '0.75rem',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
