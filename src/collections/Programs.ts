import type { CollectionConfig } from 'payload'
import { isAdminOrSuperAdmin, hideSlugFromNonSuperAdmin } from '../lib/access'

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
    create: isAdminOrSuperAdmin,
    update: isAdminOrSuperAdmin,
    delete: isAdminOrSuperAdmin,
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
        condition: hideSlugFromNonSuperAdmin,
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Logo del programa. Subir imagen que será cropeada 1:1 (400×400).',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Portada del programa. Subir imagen que será cropeada 1900×500 (19:5).',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Imagen de fondo personalizada para la página de este programa. Si no se establece, se usará el fondo animado global.',
      },
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