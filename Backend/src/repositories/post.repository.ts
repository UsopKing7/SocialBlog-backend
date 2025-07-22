import { prisma } from '../config/db'
import { PostDb, UpdatePostDb } from '../types/post.type'

export const postRepository = {
  createPost: async (data: PostDb) => {
    return await prisma.post.create({ data })
  },

  updatePost: async (data: UpdatePostDb, id_post: string) => {
    return await prisma.post.update({
      where: { id_post }, 
      data
    })
  },

  findPostIdAndUserId: async (id_post: string, id_author: string) => {
    return await prisma.post.findFirst({
      where: {
        id_author,
        id_post
      }
    })
  },

  getAllPosts: async () => {
    return await prisma.post.findMany()
  },

  getAllPostsIdUser: async (id_author: string) => {
    return await prisma.post.findMany({
      where: {
        id_author
      }
    })
  },

  deletePostIdUser: async (id_post: string) => {
    return await prisma.post.delete({
      where: {
        id_post
      }
    })
  }
}
