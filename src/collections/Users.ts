import type { CollectionConfig } from 'payload'
import { isSuperAdmin, isAdminOrSuperAdmin } from '../lib/access'

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
      // Admin can read all users (to manage editors/admins). Editors only see themselves.
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    update: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      // Admin can update non-superadmin users (editors and fellow admins)
      if (user.role === 'admin') {
        return { role: { not_equals: 'superadmin' } } as any
      }
      // Editors can update their own profile
      return { id: { equals: user.id } } as any
    },
    delete: ({ req: { user } }: any) => {
      if (!user) return false
      if (user.role === 'superadmin') return true
      // Admin can delete non-superadmin users
      if (user.role === 'admin') {
        return { role: { not_equals: 'superadmin' } } as any
      }
      return false
    },
    create: isAdminOrSuperAdmin,
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
