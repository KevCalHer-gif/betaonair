import type { Access, AccessArgs } from 'payload'

/**
 * Type-safe user with role.
 * Uses 'any' for req to avoid Payload internal type complexity.
 */
interface RoleUser {
  id?: number | string
  role?: 'superadmin' | 'admin' | 'editor'
}

/** Only superadmin */
export const isSuperAdmin: Access = ({ req }: any): boolean => {
  const user = req?.user as RoleUser | undefined
  return user?.role === 'superadmin'
}

/** Only admin */
export const isAdmin: Access = ({ req }: any): boolean => {
  const user = req?.user as RoleUser | undefined
  return user?.role === 'admin'
}

/** Admin or superadmin */
export const isAdminOrSuperAdmin: Access = ({ req }: any): boolean => {
  const user = req?.user as RoleUser | undefined
  return user?.role === 'superadmin' || user?.role === 'admin'
}

/** Editor, admin, or superadmin */
export const isEditorOrAbove: Access = ({ req }: any): boolean => {
  const user = req?.user as RoleUser | undefined
  return user?.role === 'superadmin' || user?.role === 'admin' || user?.role === 'editor'
}

/** Used for admin.hidden on slug fields — only superadmin sees them */
export const hideSlugFromNonSuperAdmin = ({ user }: any): boolean => {
  return user?.role !== 'superadmin'
}
