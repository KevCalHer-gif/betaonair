import type { CollectionConfig } from 'payload'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'email', 'leido'],
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
    },
    {
      name: 'mensaje',
      type: 'textarea',
      required: true,
    },
    {
      name: 'leido',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'fechaRecibido',
      type: 'date',
    },
  ],
}
