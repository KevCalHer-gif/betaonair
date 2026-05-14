import type { GlobalConfig } from 'payload'

export const Seo: GlobalConfig = {
  slug: 'seo',
  label: 'SEO',
  access: {
    read: () => true,
    update: ({ req }: any) => req.user?.role === 'admin',
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
