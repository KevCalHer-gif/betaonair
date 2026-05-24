import type { CollectionConfig } from 'payload'
import { isEditorOrAbove } from '../lib/access'

export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'email', 'leido'],
  },
  access: {
    read: isEditorOrAbove,
    create: () => true, // Public can submit the form
    update: isEditorOrAbove,
    delete: isEditorOrAbove,
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
