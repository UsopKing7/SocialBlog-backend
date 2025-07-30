import { prisma } from '../config/db'

export const userRepository = {
  getAll: async () => {
    return await prisma.user.findMany()
  }
}