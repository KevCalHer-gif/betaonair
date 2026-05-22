import type { CollectionConfig } from 'payload'

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '')
}

const Projects: CollectionConfig = {
  slug: 'projects',
  admin: { useAsTitle: 'title', group: 'Contenido' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user && (user?.role === 'admin' || user?.role === 'editor'),
    update: ({ req: { user } }) => !!user && (user?.role === 'admin' || user?.role === 'editor'),
    delete: ({ req: { user } }) => !!user && user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Título del proyecto' },
    { name: 'slug', type: 'text', unique: true, index: true, admin: { position: 'sidebar', readOnly: true }, hooks: { beforeValidate: [({ data }) => { if (data?.title) data.slug = generateSlug(data.title) }] } },
    { name: 'description', type: 'richText', label: 'Descripción' },
    { name: 'client', type: 'text', label: 'Cliente' },
    { name: 'service', type: 'relationship', relationTo: 'services', hasMany: false, label: 'Servicio relacionado', admin: { description: 'Vincula este proyecto a un servicio (ej. Producción Audiovisual)' } },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', label: 'Imagen principal' },
    { name: 'status', type: 'select', label: 'Estado', defaultValue: 'draft', options: [{ label: 'Borrador', value: 'draft' }, { label: 'Publicado', value: 'published' }, { label: 'Archivado', value: 'archived' }] },
    { name: 'order', type: 'number', label: 'Orden de visualización', admin: { position: 'sidebar' } },
  ],
  timestamps: true,
}

export { Projects }