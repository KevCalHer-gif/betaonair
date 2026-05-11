import type { CollectionConfig } from 'payload'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isLive', 'status'],
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
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'accentColor',
      type: 'text',
      defaultValue: '#c61d4a',
    },
    {
      name: 'isLive',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'liveUrl',
      type: 'text',
    },
    {
      name: 'status',
      type: 'select',
      options: ['active', 'inactive'],
      defaultValue: 'active',
    },
  ],
}
