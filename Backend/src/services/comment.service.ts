import { postRepository } from '../repositories/post.repository'
import { commentRepository } from '../repositories/comment.repository'
import { userRepository } from '../repositories/user.repository'
import { CreateCommentDB, DeleteCommentDB, UpdaeCommentDB } from '../types/comment.type'
import { isCommentOwnedBy } from '../utils/owner.utils'

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
    if (!commentPost || !isCommentOwnedBy(commentPost, comment.id_post, comment.id_author))
      throw new Error ('Error al encontrar el comentario')

    const commentUpdate = await commentRepository.updateComment({
      content: comment.content, id_author: comment.id_author, id_comment: comment.id_comment, id_post: comment.id_post
    })

    return commentUpdate
  },

  getCommetsPost: async (id_post: string) => {
    const post = await postRepository.findPost(id_post)
    if (!post) throw new Error ('Error al encontrar el post')
    
    const getComments = await commentRepository.findCommentPost(id_post)
    
    return getComments
  },

  deleteComment: async (comment: DeleteCommentDB) => {
    const user = await userRepository.findIdUser(comment.id_author)
    if (!user) throw new Error ('Error al encontrar el user')
    
    const post = await postRepository.findPost(comment.id_post)
    if (!post) throw new Error ('Error al encontrar el post')
    
    const commentExiste = await commentRepository.findComment(comment.id_comment)
    if (!commentExiste || !isCommentOwnedBy( commentExiste, comment.id_post, comment.id_author)) throw new Error ('Error al encontrar el comment')
    
    const commentDelete = await commentRepository.deleteComment({
      id_author: comment.id_author, id_post: comment.id_post, id_comment: comment.id_comment
    })

    return commentDelete
  }
}
