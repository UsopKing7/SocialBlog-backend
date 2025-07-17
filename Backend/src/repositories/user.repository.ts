import { prisma } from '../config/db'

export const userRepository = {
  findIdUser: async (id_user: string) => {
    return prisma.user.findUnique({ where: { id_user: id_user }})
  }
}
