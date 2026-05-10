'use client'

import { motion } from 'framer-motion'

const services = [
  {
    title: 'Diseño Gráfico',
    items: [
      'Branding e identidad visual',
      'Diseño editorial',
      'Diseño publicitario',
      'Artes para campañas',
      'Recursos gráficos',
    ],
  },
  {
    title: 'Producción Audiovisual y Animación',
    items: [
      'Producción de video',
      'Motion graphics',
      'Animación 2D',
      'Animación 3D',
      'Contenido audiovisual',
    ],
  },
  {
    title: 'Gestión de RRSS',
    items: [
      'Administración de redes',
      'Creación de contenido',
      'Community management',
      'Estrategia digital',
    ],
  },
  {
    title: 'Pauta Publicitaria',
    items: [
      'Campañas digitales',
      'Facebook Ads',
      'Instagram Ads',
      'Google Ads',
      'Estrategias de pauta',
    ],
  },
  {
    title: 'Monitoreo Digital',
    items: [
      'Seguimiento de campañas',
      'Métricas digitales',
      'Analítica',
      'Monitoreo de medios',
    ],
  },
  {
    title: 'Streaming',
    items: [
      'Transmisiones en vivo',
      'Eventos online',
      'Cobertura digital',
      'Streaming corporativo',
    ],
  },
  {
    title: 'Activación BTL',
    items: [
      'Activaciones de marca',
      'Eventos promocionales',
      'Experiencias interactivas',
      'Marketing experiencial',
    ],
  },
  {
    title: 'Gestión ATL',
    items: [
      'Campañas masivas',
      'Publicidad tradicional',
      'Medios de comunicación',
    ],
  },
  {
    title: 'Micro ATL',
    items: [
      'Campañas segmentadas',
      'Estrategias híbridas',
    ],
  },
  {
    title: 'Gestión de Talentos',
    items: [
      'Influencers',
      'Imagen pública',
      'Talentos digitales',
      'Colaboraciones de marca',
    ],
  },
  {
    title: 'Comunicación Integral',
    items: [
      'Estrategia de marca',
      'Comunicación corporativa',
      'Campañas integrales',
      'Marketing 360',
    ],
  },
]

export default function ServicesSection() {
  return (
    <section id="servicios" style={{ background: '#0a0a0a', padding: '5rem 1rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#fff',
            marginBottom: 3,
            textAlign: 'center',
          }}
        >
          Nuestros <span style={{ color: '#c61d4a' }}>Servicios</span>
        </motion.h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                border: '1px solid #222',
                borderRadius: 0,
                padding: '1.5rem',
                background: 'transparent',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c61d4a'
                e.currentTarget.style.background = '#111'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#222'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <h3 style={{ color: '#c61d4a', fontSize: '1.2rem', marginBottom: '1rem' }}>
                {service.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {service.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      color: '#ccc',
                      padding: '0.25rem 0',
                      borderBottom:
                        j < service.items.length - 1 ? '1px solid #222' : 'none',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
