'use client'

import Image from 'next/image'
import React from 'react'

/** Extrae la URL de imagen desde un string directo o desde la respuesta populada de Payload */
function getImageUrl(
  image: string | { url?: string; sizes?: Record<string, { url?: string }> },
): string {
  if (typeof image === 'string') return image
  return image?.sizes?.program_logo?.url || image?.url || ''
}

interface ProgramCardProps {
  nombre: string
  logo: string | { url?: string; sizes?: Record<string, { url?: string }> }
  slug: string
  descripcion?: string
}

function getBlockColor(nombre: string): string {
  const n = nombre.toLowerCase()
  if (n.includes('notic') || n.includes('news') || n.includes('info')) return '#1378B4'
  if (n.includes('sport') || n.includes('deport') || n.includes('futbol') || n.includes('fútbol')) return '#0BC651'
  if (n.includes('cine') || n.includes('pelíc') || n.includes('movie')) return '#7055b0'
  if (n.includes('music') || n.includes('músi')) return '#e90d4e'
  if (n.includes('niño') || n.includes('kids') || n.includes('infant')) return '#FF6F0E'
  if (n.includes('docu') || n.includes('natur') || n.includes('histor')) return '#0e7c7b'
  return '#c61d4a'
}

export default function ProgramCard({ nombre, logo, slug, descripcion }: ProgramCardProps) {
  const blockColor = getBlockColor(nombre)
  const firstLetter = nombre.charAt(0).toUpperCase()
  const logoSrc = getImageUrl(logo)

  const handleClick = () => {
    window.location.href = `/programas/${slug}`
  }

  return (
    <div className="program-card" onClick={handleClick} style={{ zIndex: 10 }}>
      {/* Imagen de fondo: ocupa toda la tarjeta */}
      <div className="cover">
        <Image src={logoSrc} alt={nombre} fill sizes="200px" style={{ objectFit: 'cover' }} />
      </div>

      {/* Overlay semitransparente en estado normal, desaparece en hover */}
      <div className="overlay" />

      {/* Badge de género con color de bloque */}
      <div className="genre" style={{ background: blockColor }}>
        Programa
      </div>

      {/* Información principal que sube y desaparece en hover */}
      <div className="main-inform">
        <div className="title">{nombre}</div>
        <div className="subtitle">Ver programa</div>
      </div>

      {/* Letra grande decorativa */}
      <div className="big-letter">{firstLetter}</div>

      {/* Información extra que aparece desde abajo en hover */}
      <div className="extra-inform">
        <div className="title">{nombre}</div>
        {descripcion && <div className="descripcion">{descripcion}</div>}
        <div className="subtitle">Ver programa</div>
      </div>

      <style jsx>{`
        .program-card {
          width: 200px;
          height: 280px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 1rem;
          font-family: 'Bebas Neue', sans-serif;
        }

        .cover {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        .cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .program-card:hover .cover img {
          transform: scale(1.05);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          z-index: 1;
          transition: background 0.4s ease;
        }

        .program-card:hover .overlay {
          background: rgba(0, 0, 0, 0);
        }

        .genre {
          position: absolute;
          top: 0.3rem;
          left: 0.5rem;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
          color: white;
          z-index: 2;
        }

        .main-inform {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
          transform: translateY(0);
          opacity: 1;
        }

        .program-card:hover .main-inform {
          transform: translateY(-20px);
          opacity: 0;
        }

        .main-inform .title {
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .main-inform .subtitle {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.6;
        }

        .big-letter {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          font-size: 3rem;
          font-weight: bold;
          line-height: 1;
          opacity: 0.2;
          transition: all 0.4s ease;
          z-index: 1;
        }

        .program-card:hover .big-letter {
          transform: scale(1.1);
        }

        .extra-inform {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          z-index: 2;
          opacity: 0;
          transition: all 0.4s ease;
          transform: translateY(100%);
        }

        .program-card:hover .extra-inform {
          transform: translateY(0);
          opacity: 1;
        }

        .extra-inform .title {
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .extra-inform .descripcion {
          font-size: 0.6rem;
          color: #ccc;
          line-height: 1.3;
          margin: 0.3rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .extra-inform .subtitle {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.6;
        }
      `}</style>
    </div>
  )
}
