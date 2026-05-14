import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Ajustes',
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Nombre del sitio',
      required: true,
      defaultValue: 'Beta On Air',
    },
    {
      name: 'logo',
      type: 'upload',
      label: 'Logo',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Redes sociales',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Plataforma',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
