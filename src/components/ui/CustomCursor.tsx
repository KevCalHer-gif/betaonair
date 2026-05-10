'use client'

interface CustomCursorProps {
  x: number
  y: number
  color: string
  className?: string
}

export default function CustomCursor({ x, y, color, className }: CustomCursorProps) {
  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        left: x,
        top: y,
        width: 4,
        height: 4,
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
        zIndex: 9999,
      }}
    />
  )
}
