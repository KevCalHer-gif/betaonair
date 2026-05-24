import type { CollectionConfig } from 'payload'
import { isEditorOrAbove, isSuperAdmin } from '../lib/access'

export const Live: CollectionConfig = {
  slug: 'live',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive'],
  },
  access: {
    read: () => true,
    create: isEditorOrAbove,
    update: isEditorOrAbove,
    delete: isSuperAdmin,
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
