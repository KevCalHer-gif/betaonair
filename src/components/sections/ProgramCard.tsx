'use client'

import Image from 'next/image'
import React from 'react'

interface ProgramCardProps {
  nombre: string
  logo: string
  slug: string
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

export default function ProgramCard({ nombre, logo, slug }: ProgramCardProps) {
  const blockColor = getBlockColor(nombre)
  const firstLetter = nombre.charAt(0).toUpperCase()

  const handleClick = () => {
    window.location.href = `/programas/${slug}`
  }

  return (
    <div className="movie-block" onClick={handleClick} style={{ background: blockColor }}>
      <div className="genre">Programa</div>

      <div className="main-inform">
        <div className="main-inform_inner">
          <div className="title">{nombre}</div>
          <div className="subtitle">Ver programa</div>
        </div>
      </div>

      <div className="big-hours">{firstLetter}</div>

      <div className="extra-inform">
        <div className="extra-inform_inner">
          <div className="title">{nombre}</div>
          <div className="subtitle">Ver programa</div>
        </div>
      </div>

      <div className="cover">
        <Image src={logo} alt={nombre} fill sizes="200px" style={{ objectFit: 'cover' }} />
      </div>

      <style jsx>{`
        .movie-block {
          width: 200px;
          height: 220px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: flex-start;
          padding: 1rem;
          color: white;
          font-family: 'Bebas Neue', sans-serif;
        }

        .movie-block:hover {
          height: 320px;
        }

        .genre {
          position: absolute;
          top: 0.3rem;
          left: 0.5rem;
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.8;
          z-index: 2;
        }

        .main-inform {
          position: relative;
          z-index: 2;
          transition: all 0.4s ease;
          transform: translateY(0);
          opacity: 1;
        }

        .movie-block:hover .main-inform {
          transform: translateY(-20px);
          opacity: 0;
        }

        .main-inform_inner .title {
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .main-inform_inner .subtitle {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.6;
        }

        .big-hours {
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

        .movie-block:hover .big-hours {
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

        .movie-block:hover .extra-inform {
          transform: translateY(0);
          opacity: 1;
        }

        .extra-inform_inner .title {
          font-size: 1.2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        .extra-inform_inner .subtitle {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          opacity: 0.6;
        }

        .cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .movie-block:hover .cover {
          opacity: 0.3;
        }

        .cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  )
}
