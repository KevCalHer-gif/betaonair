import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'orden', 'activo'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc, operation }) => {
            if (operation === 'create' && data?.title && !data.slug) {
              data.slug = generateSlug(data.title)
            }
            if (operation === 'update' && data?.title && data.title !== originalDoc?.title) {
              data.slug = generateSlug(data.title)
            }
          },
        ],
      },
    },
    {
      name: 'descripcionCorta',
      type: 'textarea',
      maxLength: 300,
    },
    {
      name: 'descripcionLarga',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'icono',
      type: 'text',
      defaultValue: '🔧',
      maxLength: 2,
    },
    {
      name: 'imagenPrincipal',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
      required: false,
    },
    {
      name: 'activo',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
