import { prisma } from '../config/db'
import { roleCreate } from '../types/role.type'

export const roleRepository = {
  roleCreate: async (data: roleCreate) => {
    return prisma.role.create({ data })
  },

  findRole: async (name_rol: string) => {
    return prisma.role.findUnique({ where: { name_rol: name_rol }})
  }
}
