import type { CollectionConfig } from 'payload'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Episodes: CollectionConfig = {
  slug: 'episodes',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'program', 'publishedAt'],
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
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      admin: { position: 'sidebar' },
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
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: false,
      required: true,
    },
    {
      name: 'embedUrl',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published'],
      defaultValue: 'published',
    },
  ],
}
