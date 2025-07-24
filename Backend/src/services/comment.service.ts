import { postRepository } from '../repositories/post.repository'
import { commentRepository } from '../repositories/comment.repository'
import { userRepository } from '../repositories/user.repository'
import { CreateCommentDB, UpdaeCommentDB } from '../types/comment.type'

export const commentService = {
  createCommentPost: async (comment: CreateCommentDB) => {
    const user = await userRepository.findIdUser(comment.id_author)
    if (!user) throw new Error ('Error al encontrar el usuario')
    
    const post = await postRepository.findPost(comment.id_post)
    if (!post) throw new Error ('Error al encontrar el post')

    const newComment = await commentRepository.createComment({
      content: comment.content, id_author: user.id_user, id_post: post.id_post
    })
    
    if (!newComment) throw new Error ('Erro al crear el comentario')

    return newComment
  },

  updateCommentPost: async (comment: UpdaeCommentDB) => {
    if (!comment.content) throw new Error ('Almenos se debe poner un dato')
    const user = await userRepository.findIdUser(comment.id_author)
    if (!user) throw new Error ('Error al encontrar el usuario')

    const post = await postRepository.findPost(comment.id_post)
    if (!post) throw new Error ('Error al encontrar el post')

    const commentPost = await commentRepository.findComment(comment.id_comment)
    if (!commentPost) throw new Error ('Error al encontrar el comentario')

    const commentUpdate = await commentRepository.updateComment({
      content: comment.content, id_author: comment.id_author, id_comment: comment.id_comment, id_post: comment.id_post
    })

    if (!commentUpdate) throw new Error ('Error al encontrar datos')

    return commentUpdate
  },

  getCommetsPost: async (id_post: string) => {
    const post = await postRepository.findPost(id_post)
    if (!post) throw new Error ('Error al encontrar el post')
    
    const getComments = await commentRepository.findCommentPost(id_post)
    if (!getComments) throw new Error ('Error al encontrar commentarios en el post')
    
    return getComments
  }
}
