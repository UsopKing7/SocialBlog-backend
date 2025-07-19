import { prisma } from '../config/db'
import { TokenAdd } from '../types/token.type'

export const tokenRepository = {
  addToken: async (data: TokenAdd) => {
    return prisma.token.create({ data })
  },

  findTokenId: async (id_user: string) => {
    return prisma.token.findUnique({ where: { id_user: id_user }})
  }
}
