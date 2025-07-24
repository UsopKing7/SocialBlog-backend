import { prisma } from '../config/db'
import { CreateCommentDB, UpdaeCommentDB } from '../types/comment.type'
export const commentRepository = {
  createComment: async (data: CreateCommentDB) => {
    return await prisma.comment.create({ data })
  },

  updateComment: async (data: UpdaeCommentDB) => {
    return await prisma.comment.update({
      where: {
        id_comment: data.id_comment
      }, data
    })
  },

  findComment: async (id_comment: string) => {
    return await prisma.comment.findUnique({
      where: { id_comment }
    })
  },

  findCommentPost: async (id_post: string) => {
    return await prisma.comment.findMany({
      where: { id_post }
    })
  }
}
