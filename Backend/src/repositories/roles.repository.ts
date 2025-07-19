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
  }
}
