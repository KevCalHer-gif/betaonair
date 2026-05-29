import type { GlobalConfig } from 'payload'
import { isSuperAdmin } from '../lib/access'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  admin: {
    hidden: ({ user }: any) => user?.role !== 'superadmin',
  },
  access: {
    read: () => true,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
      required: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
      required: true,
    },
    {
      name: 'ogImage',
      type: 'upload',
      label: 'OG Image',
      relationTo: 'media',
    },
  ],
}
