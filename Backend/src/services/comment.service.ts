import { postRepository } from '../repositories/post.repository'
import { commentRepository } from '../repositories/comment.repository'
import { userRepository } from '../repositories/user.repository'
import { CreateCommentDB } from '../types/comment.type'

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
  }
}
