import type { CollectionConfig } from 'payload'
import { isSuperAdmin } from '../lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      // Non-superadmin users can only read their own profile
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }: any) => {
      if (!user) return false
      // Only superadmin can update any user
      if (user.role === 'superadmin') return true
      // Users can update their own profile (but not change their role)
      return { id: { equals: user.id } }
    },
    delete: isSuperAdmin,
    create: isSuperAdmin,
    admin: ({ req: { user } }: any) => {
      if (!user) return false
      // superadmin, admin, and editor can access the admin panel
      return user.role === 'superadmin' || user.role === 'admin' || user.role === 'editor'
    },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Superadmin', value: 'superadmin' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      // Only superadmin can see/change the role field
      admin: {
        condition: ({ user }: any) => user?.role === 'superadmin',
      },
    },
  ],
}
