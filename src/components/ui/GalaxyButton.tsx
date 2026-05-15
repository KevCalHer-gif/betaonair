'use client'

import { useMemo } from 'react'
import styles from './GalaxyButton.module.css'

const RANDOM = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

interface GalaxyButtonProps {
  children: React.ReactNode
}

export default function GalaxyButton({ children }: GalaxyButtonProps) {
  const ringStars = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        key: i,
        angle: RANDOM(0, 360),
        duration: RANDOM(6, 20),
        delay: RANDOM(1, 10),
        alpha: RANDOM(40, 90) / 100,
        size: RANDOM(2, 6),
        distance: RANDOM(40, 200),
      })),
    [],
  )

  const staticStars = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        key: `static-${i}`,
        duration: RANDOM(6, 20),
        delay: RANDOM(1, 10),
        size: RANDOM(2, 6),
      })),
    [],
  )

  return (
    <div className={styles['galaxy-button']}>
      <button className={styles.button}>
        <span className={styles.spark} />
        <span className={styles.backdrop} />

        <span className={styles['galaxy__container']}>
          {staticStars.map((s) => (
            <span
              key={s.key}
              className={`${styles.star} ${styles['star--static']}`}
              style={{
                '--duration': s.duration,
                '--delay': s.delay,
                '--size': s.size,
              } as React.CSSProperties}
            />
          ))}
        </span>

        <span className={styles.galaxy}>
          <span className={styles['galaxy__ring']}>
            {ringStars.map((s) => (
              <span
                key={s.key}
                className={styles.star}
                style={{
                  '--angle': s.angle,
                  '--duration': s.duration,
                  '--delay': s.delay,
                  '--alpha': s.alpha,
                  '--size': s.size,
                  '--distance': s.distance,
                } as React.CSSProperties}
              />
            ))}
          </span>
        </span>

        <span className={styles.text}>{children}</span>
      </button>
    </div>
  )
}
