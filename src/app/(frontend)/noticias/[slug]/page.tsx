import { notFound } from 'next/navigation'
import Link from 'next/link'

interface NoticiaCompleta {
  titulo: string
  fecha: string
  slug: string
  contenido: string[]
}

const noticiasCompleto: NoticiaCompleta[] = [
  {
    titulo: 'Beta On Air lanza su nueva temporada de programas',
    fecha: '10 mayo 2026',
    slug: 'nueva-temporada-2026',
    contenido: [
      'La plataforma digital de contenidos bolivianos, Beta On Air, ha anunciado el lanzamiento de su nueva temporada de programas que incluye cinco propuestas renovadas. Esta nueva etapa promete traer contenido fresco y relevante para toda la familia boliviana.',
      'Entre los programas que regresan con fuerza se encuentran "Beta Kids", "Piedra y Camino", "The Bronta Time", "No Tan Calladitas" y "Yukast". Cada uno de ellos ha sido rediseñado para ofrecer una experiencia más interactiva y cercana a la audiencia.',
      'El equipo de producción ha trabajado durante meses para garantizar que la calidad del contenido esté a la altura de las expectativas del público. La nueva temporada arranca el próximo 15 de mayo con episodios semanales que se podrán disfrutar tanto en vivo como en la plataforma de podcast.',
      'Beta On Air reafirma así su compromiso con la difusión de cultura, entretenimiento y educación en Bolivia, apostando por contenidos que reflejen la diversidad y riqueza del país.',
    ],
  },
  {
    titulo: 'No Tan Calladitas: voces que rompen el silencio',
    fecha: '8 mayo 2026',
    slug: 'no-tan-calladitas-voces',
    contenido: [
      '"No Tan Calladitas", el programa que da voz a las mujeres bolivianas, regresa con una temporada cargada de historias inspiradoras. Cada episodio aborda temas de empoderamiento, igualdad y superación personal.',
      'Las conductoras del programa han seleccionado invitadas de diversos ámbitos: emprendedoras, artistas, activistas y profesionales que comparten sus experiencias y desafíos en una Bolivia en constante cambio.',
      'La audiencia ha respondido de manera entusiasta, posicionando al programa como un espacio de referencia para la conversación feminista en el país. Se espera que esta nueva etapa consolide aún más su impacto social.',
      'No Tan Calladitas se emite todos los miércoles a las 20:00 horas y está disponible en formato podcast para quienes prefieran escucharlo en cualquier momento.',
    ],
  },
  {
    titulo: 'Beta Kids: entretenimiento educativo para los más pequeños',
    fecha: '5 mayo 2026',
    slug: 'beta-kids-temporada',
    contenido: [
      'Beta Kids, el espacio dedicado a niños y niñas, continúa creciendo con contenido divertido, educativo y con valores bolivianos. Esta temporada incluye nuevas secciones interactivas y juegos que estimulan la creatividad.',
      'El equipo pedagógico ha colaborado con educadores bolivianos para diseñar actividades que refuercen el aprendizaje de matemáticas, lenguaje y ciencias de manera lúdica. Los personajes animados del programa guían a los pequeños en cada aventura.',
      'Los padres han valorado positivamente el enfoque del programa, que combina entretenimiento con formación. Además, se han incorporado cápsulas sobre cultura boliviana, tradiciones y geografía del país.',
      'Beta Kids se transmite los sábados a las 10:00 horas y cuenta con una sección especial los domingos donde los niños pueden enviar sus dibujos y preguntas.',
    ],
  },
  {
    titulo: 'Yukast celebra su primer aniversario al aire',
    fecha: '1 mayo 2026',
    slug: 'yukast-aniversario',
    contenido: [
      'El podcast boliviano que habla de todo lo que importa cumple un año al aire con una emisión especial llena de sorpresas. Yukast se ha convertido en un referente para la juventud boliviana por su abordaje honesto y sin filtros de temas cotidianos.',
      'Durante este año, el programa ha entrevistado a figuras destacadas de la música, el deporte y la cultura boliviana. También ha abordado temas como la salud mental, el emprendimiento juvenil y la identidad cultural.',
      'Para celebrar el aniversario, el equipo preparó una emisión en vivo con la participación de oyentes que compartieron sus experiencias y anécdotas. Además, se sortearon premios entre la audiencia que siguió la transmisión.',
      'Yukast continúa creciendo y promete sorpresas para el segundo año, incluyendo colaboraciones internacionales y contenido exclusivo para sus suscriptores.',
    ],
  },
]

type Props = {
  params: Promise<{ slug: string }>
}

export default async function NoticiaSlugPage({ params }: Props) {
  const { slug } = await params
  const noticia = noticiasCompleto.find((n) => n.slug === slug)

  if (!noticia) {
    notFound()
  }

  return (
    <main style={{ minHeight: '100vh', padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link
        href="/noticias"
        style={{
          color: '#c61d4a',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '1.5rem',
          fontSize: '1rem',
          fontWeight: 'bold',
        }}
      >
        ← Volver a noticias
      </Link>
      <h1
        style={{
          fontFamily: 'var(--font-brand)',
          color: '#c61d4a',
          fontSize: '2rem',
          marginBottom: '0.5rem',
        }}
      >
        {noticia.titulo}
      </h1>
      <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{noticia.fecha}</p>
      {noticia.contenido.map((parrafo, idx) => (
        <p
          key={idx}
          style={{
            color: '#ccc',
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
            textAlign: 'justify',
          }}
        >
          {parrafo}
        </p>
      ))}
    </main>
  )
}
