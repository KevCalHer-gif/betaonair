import type { CollectionConfig } from 'payload'

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')
}

const Services: CollectionConfig = {
  slug: 'services',
  admin: { useAsTitle: 'title', group: 'Contenido' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user && (user?.role === 'admin' || user?.role === 'editor'),
    update: ({ req: { user } }) => !!user && (user?.role === 'admin' || user?.role === 'editor'),
    delete: ({ req: { user } }) => !!user && user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título del servicio' },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { position: 'sidebar', readOnly: true }, hooks: { beforeValidate: [({ data }) => { if (data?.title) data.slug = generateSlug(data.title) }] } },
    { name: 'description', type: 'richText', label: 'Descripción' },
    { name: 'price', type: 'number', label: 'Precio (opcional)', required: false },
    { name: 'features', type: 'array', label: 'Características', fields: [{ name: 'feature', type: 'text', label: 'Beneficio' }] },
    { name: 'isActive', type: 'checkbox', label: 'Activo', defaultValue: true },
    { name: 'order', type: 'number', label: 'Orden de visualización', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}

export default Services