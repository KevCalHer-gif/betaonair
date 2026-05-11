import type { CollectionConfig } from 'payload'

export const Live: CollectionConfig = {
  slug: 'live',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive'],
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
      name: 'embedUrl',
      type: 'text',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'programs',
      hasMany: false,
    },
  ],
}
