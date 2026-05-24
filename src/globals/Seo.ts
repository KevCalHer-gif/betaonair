import type { GlobalConfig } from 'payload'
import { isAdminOrSuperAdmin } from '../lib/access'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  access: {
    read: () => true,
    update: isAdminOrSuperAdmin,
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
