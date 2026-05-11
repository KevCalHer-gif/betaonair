import type { CollectionConfig } from 'payload'

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const Sponsorships: CollectionConfig = {
  slug: 'sponsorships',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'name',
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
            if (operation === 'create' && data?.name && !data.slug) {
              data.slug = generateSlug(data.name)
            }
            if (operation === 'update' && data?.name && data.name !== originalDoc?.name) {
              data.slug = generateSlug(data.name)
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
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
    },
    {
      name: 'url',
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
