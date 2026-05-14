import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  access: {
    read: () => true,
    update: ({ req }: any) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      required: true,
    },
    {
      name: 'slogan',
      type: 'text',
      label: 'Slogan',
    },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'Logo URL',
    },
    {
      name: 'facebookUrl',
      type: 'text',
      label: 'Facebook URL',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      label: 'Instagram URL',
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      label: 'YouTube URL',
    },
    {
      name: 'tiktokUrl',
      type: 'text',
      label: 'TikTok URL',
    },
  ],
}
