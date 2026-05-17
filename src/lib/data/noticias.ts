export interface NoticiaItem {
  titulo: string
  fecha: string
  slug: string
  resumen: string
  contenido: string
}

export const noticias: NoticiaItem[] = [
  {
    titulo: 'Beta On Air lanza su nueva temporada de programas',
    fecha: '10 mayo 2026',
    slug: 'nueva-temporada-2026',
    resumen: 'La plataforma digital de contenidos bolivianos arranca con fuerza su nueva temporada con cinco programas renovados y mucho contenido para toda la familia.',
    contenido: `Beta On Air arranca con fuerza su nueva temporada 2026. Cinco programas renovados, nuevas voces y mucho contenido para toda la familia boliviana. Esta temporada promete ser la más ambiciosa del canal, con producciones mejoradas y formatos innovadores que conectan con la audiencia boliviana en todas las plataformas digitales. El equipo de Beta On Air trabajó durante meses para traer contenido fresco, relevante y de calidad. Cada programa tiene su propia identidad y propuesta de valor, desde entretenimiento familiar hasta análisis cultural profundo.`,
  },
  {
    titulo: 'No Tan Calladitas: voces que rompen el silencio',
    fecha: '8 mayo 2026',
    slug: 'no-tan-calladitas-voces',
    resumen: 'El programa que da voz a las mujeres bolivianas regresa con historias que inspiran y generan conversación en toda Bolivia.',
    contenido: `No Tan Calladitas regresa con una nueva temporada cargada de historias reales, voces auténticas y conversaciones que importan. El programa se ha convertido en un espacio de referencia para las mujeres bolivianas que quieren ser escuchadas. Esta temporada aborda temas como emprendimiento femenino, maternidad, identidad cultural y liderazgo. Cada episodio presenta testimonios de mujeres de distintas regiones de Bolivia que comparten sus experiencias con valentía y honestidad. No Tan Calladitas es más que un programa, es un movimiento.`,
  },
  {
    titulo: 'Beta Kids: entretenimiento educativo para los más pequeños',
    fecha: '5 mayo 2026',
    slug: 'beta-kids-temporada',
    resumen: 'El espacio dedicado a niños y niñas continúa creciendo con contenido divertido, educativo y con valores bolivianos.',
    contenido: `Beta Kids sigue creciendo y esta temporada llega con más contenido educativo, más juegos y más diversión para los niños y niñas bolivianos. El programa combina entretenimiento con aprendizaje de una manera natural y efectiva. Los pequeños pueden disfrutar de cuentos, canciones, experimentos simples y actividades que refuerzan valores como la solidaridad, el respeto y el amor por Bolivia. Beta Kids es el espacio seguro y divertido que los padres bolivianos confían para sus hijos.`,
  },
  {
    titulo: 'Yukast celebra su primer aniversario al aire',
    fecha: '1 mayo 2026',
    slug: 'yukast-aniversario',
    resumen: 'El podcast boliviano que habla de todo lo que importa cumple un año con una emisión especial llena de sorpresas.',
    contenido: `Yukast cumple su primer año al aire y lo celebra con una emisión especial que repasa los momentos más destacados de este primer año de vida. El podcast que nació con la misión de hablar de todo lo que importa a los bolivianos ha logrado construir una comunidad fiel y comprometida. En este primer aniversario, el equipo de Yukast agradece a su audiencia y anuncia novedades para el segundo año: nuevos formatos, invitados especiales y colaboraciones con otros creadores bolivianos. El mejor podcast boliviano acaba de empezar.`,
  },
]
