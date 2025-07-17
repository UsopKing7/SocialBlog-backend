import { prisma } from '../config/db'
import { TokenAdd } from '../types/token.type'

export const tokenRepository = {
  addToken: async (data: TokenAdd) => {
    return prisma.token.create({ data })
  }
}
