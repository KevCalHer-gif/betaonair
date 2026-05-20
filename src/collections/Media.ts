import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    focalPoint: true,
    imageSizes: [
      {
        name: 'program_logo',
        width: 400,
        height: 400,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
      },
      {
        name: 'program_cover',
        width: 1900,
        height: 500,
        fit: 'cover',
        position: 'centre',
        withoutEnlargement: true,
      },
    ],
  },
}
