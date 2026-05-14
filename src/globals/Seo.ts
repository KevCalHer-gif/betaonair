import type { GlobalConfig } from 'payload'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título por defecto',
      defaultValue: 'Beta On Air — Hacemos que se note.',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Descripción por defecto',
      defaultValue: 'Beta On Air — plataforma digital de contenidos bolivianos.',
    },
    {
      name: 'ogImage',
      type: 'upload',
      label: 'Imagen Open Graph',
      relationTo: 'media',
    },
  ],
}
