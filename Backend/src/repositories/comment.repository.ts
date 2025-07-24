import { prisma } from '../config/db'
import { CreateCommentDB } from '../types/comment.type'
export const commentRepository = {
  createComment: async (data: CreateCommentDB) => {
    return await prisma.comment.create({ data })
  }
}
