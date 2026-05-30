import type { CollectionConfig } from 'payload'
import { isAdminOrSuperAdmin, isSuperAdmin } from '../lib/access'

/**
 * Registro de visitas a páginas del frontend.
 * Datos crudos de analytics — las agregaciones se hacen en src/lib/api/pageviews.ts.
 * Slug: 'pageviews' (sin cambios, coincide con tabla existente en BD).
 * Admin: oculto del menú, solo accesible vía API.
 */
export const PageViews: CollectionConfig = {
  slug: 'pageviews',
  labels: {
    plural: '📊 Analytics',
    singular: 'Analytics',
  },
  admin: {
    hidden: false,
    group: 'Contenido',
    components: {
      views: {
        list: {
          Component: '/components/admin/AnalyticsDashboard.tsx',
        },
      },
    },
  },
  access: {
    read: isAdminOrSuperAdmin,
    create: () => true,
    update: () => false,
    delete: isSuperAdmin,
  },
  fields: [
    // --- Campos existentes (no modificar) ---
    {
      name: 'path',
      type: 'text',
      required: true,
      label: 'Ruta visitada',
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
    // --- Nuevos campos para analytics dashboard ---
    {
      name: 'contentType',
      type: 'select',
      label: 'Tipo de contenido',
      options: [
        { label: 'Podcast', value: 'podcast' },
        { label: 'Video', value: 'video' },
        { label: 'Noticia', value: 'noticia' },
        { label: 'Servicio', value: 'servicio' },
        { label: 'Portafolio', value: 'portafolio' },
        { label: 'En Vivo', value: 'en-vivo' },
        { label: 'Otro', value: 'otro' },
      ],
      defaultValue: 'otro',
    },
    {
      name: 'contentSlug',
      type: 'text',
      label: 'Slug del contenido',
    },
    {
      name: 'contentTitle',
      type: 'text',
      label: 'Título del contenido',
    },
    {
      name: 'sessionId',
      type: 'text',
      label: 'ID de sesión',
    },
    {
      name: 'device',
      type: 'select',
      label: 'Dispositivo',
      options: [
        { label: 'Móvil', value: 'mobile' },
        { label: 'Escritorio', value: 'desktop' },
        { label: 'Tablet', value: 'tablet' },
      ],
    },
    {
      name: 'country',
      type: 'text',
      label: 'País',
    },
    {
      name: 'referrer',
      type: 'text',
      label: 'Referrer',
    },
    {
      name: 'duration',
      type: 'number',
      label: 'Duración (segundos)',
      admin: {
        description: 'Tiempo que el usuario permaneció en la página',
      },
    },
  ],
  timestamps: true,
}