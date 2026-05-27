import type { CollectionConfig } from 'payload'
import { isAdminOrSuperAdmin } from '../lib/access'

/**
 * Registro de visitas a páginas del frontend.
 * Usado por el Dashboard de métricas.
 */
export const PageViews: CollectionConfig = {
  slug: 'pageviews',
  admin: {
    useAsTitle: 'path',
    defaultColumns: ['path', 'section', 'timestamp'],
    group: 'Analytics',
    description: 'Métricas de visitas registradas automáticamente.',
  },
  access: {
    read: isAdminOrSuperAdmin,
    create: () => true,
    update: () => false,
    delete: isAdminOrSuperAdmin,
  },
  fields: [
    {
      name: 'path',
      type: 'text',
      required: true,
      label: 'Ruta visitada',
      admin: { description: 'Ej: /noticias/beta-on-air-crece' },
    },
    {
      name: 'section',
      type: 'select',
      label: 'Sección del sitio',
      options: [
        { label: 'Inicio', value: 'home' },
        { label: 'Programas', value: 'programs' },
        { label: 'En Vivo', value: 'live' },
        { label: 'Noticias', value: 'news' },
        { label: 'Patrocinios', value: 'sponsorships' },
        { label: 'Servicios', value: 'services' },
        { label: 'Contacto', value: 'contact' },
        { label: 'Otra', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: false,
      label: 'Programa relacionado',
      admin: { condition: (data: any) => data?.section === 'programs', position: 'sidebar' },
    },
    {
      name: 'news',
      type: 'relationship',
      relationTo: 'news',
      hasMany: false,
      label: 'Noticia relacionada',
      admin: { condition: (data: any) => data?.section === 'news', position: 'sidebar' },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      hasMany: false,
      label: 'Servicio relacionado',
      admin: { condition: (data: any) => data?.section === 'services', position: 'sidebar' },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      label: 'Fecha y hora de la visita',
      admin: { date: { pickerAppearance: 'dayAndTime' }, position: 'sidebar' },
    },
  ],
  timestamps: true,
}
