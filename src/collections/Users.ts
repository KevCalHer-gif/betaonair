import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'admin') return true
      // Users can read their own profile
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return false
    },
    delete: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return false
    },
    create: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return false
    },
    admin: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'admin') return true
      return false
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'viewer'],
      defaultValue: 'editor',
      required: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}
