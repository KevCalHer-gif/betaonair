export interface ProgramaItem {
  nombre: string
  slug: string
  logo: string
  descripcion: string
  coverImage?: string
}

export const programas: ProgramaItem[] = [
  {
    nombre: 'Beta Kids',
    slug: 'beta-kids',
    logo: '/images/programas/beta-kids.png',
    descripcion: 'El espacio de entretenimiento educativo para los más pequeños de la casa. Contenido divertido, canciones y valores bolivianos para niños y niñas.',
    coverImage: '/images/programas/cover-beta-kids.png',
  },
  {
    nombre: 'Piedra y Camino',
    slug: 'piedra-y-camino',
    logo: '/images/programas/piedra-y-camino.png',
    descripcion: 'Un viaje por los paisajes, culturas y tradiciones de Bolivia. Exploramos cada rincón del país con respeto y curiosidad.',
    coverImage: '/images/programas/cover-piedra-y-camino.png',
  },
  {
    nombre: 'The Bronca Time',
    slug: 'the-bronca-time',
    logo: '/images/programas/the-bronca-time.png',
    descripcion: 'El programa donde se dice lo que nadie más dice. Análisis, opinión y debate sobre la actualidad boliviana sin filtros.',
    coverImage: '/images/programas/cover-the-bronca-time.png',
  },
  {
    nombre: 'No Tan Calladitas',
    slug: 'no-tan-calladitas',
    logo: '/images/programas/no-tan-calladitas.png',
    descripcion: 'El espacio de las voces femeninas bolivianas. Historias reales, emprendimiento, identidad y liderazgo protagonizados por mujeres.',
    coverImage: '/images/programas/cover-no-tan-calladitas.png',
  },
  {
    nombre: 'Yukast',
    slug: 'yukast',
    logo: '/images/programas/yukast.png',
    descripcion: 'El podcast boliviano que habla de todo lo que importa. Cultura, tecnología, sociedad y mucho más en formato conversacional.',
    coverImage: '/images/programas/cover-yukast.png',
  },
]
