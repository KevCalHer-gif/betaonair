import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'estado', 'orden', 'destacado'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) {
        return true
      }
      return {
        estado: { equals: 'published' },
      }
    },
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
      name: 'cliente',
      type: 'text',
    },
    {
      name: 'descripcionCorta',
      type: 'textarea',
      maxLength: 250,
    },
    {
      name: 'descripcionLarga',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'categorias',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'imagenes',
      type: 'array',
      fields: [
        {
          name: 'imagen',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      name: 'urlExterna',
      type: 'text',
    },
    {
      name: 'estado',
      type: 'select',
      options: ['draft', 'published', 'archived'],
      defaultValue: 'draft',
    },
    {
      name: 'orden',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'destacado',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
