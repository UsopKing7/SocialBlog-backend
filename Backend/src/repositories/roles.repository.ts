import { prisma } from '../config/db'
import { UserRoleCreate, CreateRole } from '../types/role.type'

export const roleRepository = {
  createUserRole: async (data: UserRoleCreate) => {
    return await prisma.userRole.create({ data })
  },

  findRoleName: async (name_role: string) => {
    return await prisma.role.findUnique({ where: { name_role: name_role }})
  },

  createRole: async (data: CreateRole) => {
    return await prisma.role.create({ data })
  },

  getRolesUser: async (id_user: string) => {
    const role = await prisma.userRole.findMany({
      where: { id_user },
      include: { role: true }
    })
    return role.map(r => ({
      id: r.role.id_role,
      name_role: r.role.name_role
    }))
  }
}
