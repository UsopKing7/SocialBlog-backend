import { prisma } from '../config/db'
import { LikePushCommentDB, LikePushPostDB } from '../types/likes.type'

export const likesRepository = {
  // para like post
  pushLike: async (data: LikePushPostDB) => {
    return await prisma.like.create({ data })
  },

  findLike: async (id_user: string, id_post: string) => {
    return await prisma.like.findFirst({
      where: {
        id_user: id_user,
        id_post: id_post
      }
    })
  },

  remobeLike: async (id_like: string) => {
    return await prisma.like.delete({
      where: { id_like }
    })
  },

  // para like commet
  likePushComment: async (data: LikePushCommentDB) => {
    return await prisma.like.create({ data })
  },

  findLikeComment: async (id_user: string, id_comment: string) => {
    return await prisma.like.findFirst({
      where: {
        id_user,
        id_comment
      }
    })
  },

  removeLikeComment: async (id_like: string) => {
    return prisma.like.delete({
      where: { id_like }
    })
  }
}
