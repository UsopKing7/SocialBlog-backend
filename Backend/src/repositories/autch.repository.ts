import { prisma } from '../config/db'
import { UserCreate } from '../types/user.type'

export const postRepository = {
  createUser: async (data: UserCreate) => {
    return prisma.user.create({ data })
  },

  findEmail: async (email: string) => {
    return prisma.user.findUnique({ where: { email }})
  }
}
