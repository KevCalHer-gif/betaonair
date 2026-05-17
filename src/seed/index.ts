import { config } from 'dotenv'
import { resolve } from 'path'
import { createPayload } from '@payloadcms/next'

;(async () => {
  config({ path: resolve(__dirname, '../../.env') })

  const payload = await createPayload({
    secret: process.env.PAYLOAD_SECRET!,
    db: {
      adapter: 'postgres',
      url: process.env.DATABASE_URL!,
    },
  })

  // 1) crear programa Beta Kids
  const program = await payload.create({
    collection: 'programs',
    data: {
      title: 'Beta Kids',
      slug: 'beta-kids',
      description: 'El espacio de entretenimiento educativo para los más pequeños.',
      status: 'active',
      logo: '/images/programas/beta-kids.png',
    },
  })

  // 2) crear dos episodios
  await payload.create({
    collection: 'episodes',
    data: {
      title: 'Aprendiendo los colores',
      slug: 'aprendiendo-colores',
      program: program.id,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      status: 'published',
    },
  })
  await payload.create({
    collection: 'episodes',
    data: {
      title: 'Canción de los números',
      slug: 'cancion-numeros',
      program: program.id,
      embedUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
      status: 'published',
    },
  })

  // 3) crear noticia
  await payload.create({
    collection: 'news',
    data: {
      title: 'Beta On Air lanza nueva temporada',
      slug: 'nueva-temporada-2026',
      content: [
        {
          children: [
            { text: 'Con cinco programas renovados, Beta On Air arranca su temporada 2026.' },
          ],
        },
      ],
      status: 'published',
      publishedAt: new Date().toISOString(),
    },
  })

  // 4) crear stream en vivo activo
  await payload.create({
    collection: 'live',
    data: {
      title: 'En Vivo – Beta On Air',
      embedUrl: 'https://www.youtube.com/embed/live_stream?channel=UC...',
      isActive: true,
    },
  })

  // Seed verificado — todos los datos de prueba se insertaron correctamente.
  console.log('✅ Seed ejecutado correctamente.')
  process.exit(0)
})()
