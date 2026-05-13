import Link from 'next/link'
import '@/app/(frontend)/animations.css'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const linkStyle: React.CSSProperties = {
  color: '#ccc',
  textDecoration: 'none',
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href} className="nav-link" style={linkStyle}>
      {children}
    </Link>
  )
}
