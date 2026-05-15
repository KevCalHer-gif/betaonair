'use client'

import React from 'react'
import styles from './ProgramCard.module.css'

interface ProgramCardProps {
  nombre: string
  logo: string
  slug: string
}

export default function ProgramCard({ nombre, logo, slug }: ProgramCardProps) {
  const handleClick = () => {
    window.location.href = `/programas/${slug}`
  }

  return (
    <div className={styles.item} onClick={handleClick}>
      <img src={logo} alt={nombre} />
      <div className={styles.caption}>
        <h3>{nombre}</h3>
        <svg viewBox="0 0 448 512" width="100" title="arrow-right">
          <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
        </svg>
      </div>
    </div>
  )
}
