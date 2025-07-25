import { likesRepository } from '../repositories/likes.repository'
import { userRepository } from '../repositories/user.repository'
import { LikePushCommentDB, LikePushPostDB } from '../types/likes.type'
import { postRepository } from '../repositories/post.repository'
import { commentRepository } from '../repositories/comment.repository'

export const likeService = {
  likePush: async (data: LikePushPostDB) => {
    const { id_post, id_user } = data
    const user = await userRepository.findIdUser(data.id_user)
    if (!user) throw new Error ('User no encontrado')

    const post = await postRepository.findPost(data.id_post)
    if (!post) throw new Error ('Post no encontrado')

    const likeExiste = await likesRepository.findLike(data.id_user, data.id_post)

    if (likeExiste) return likeExiste

    const like = await likesRepository.pushLike({
      id_user: id_user, id_post: id_post
    })

    return like
  },

  likeRemove: async ({ id_user, id_post } : { id_user: string, id_post: string }) => {
    const user = await userRepository.findIdUser(id_user)
    if (!user) throw new Error ('User no encontrado')

    const post = await postRepository.findPost(id_post)
    if (!post) throw new Error ('Post no encontrado')

    const like = await likesRepository.findLike(id_user, id_post)
    if (!like) return

    const removeLike = await likesRepository.remobeLike(like.id_like)

    return removeLike
  },

  likePushComment: async (data: LikePushCommentDB) => {
    const { id_comment, id_user } = data
    const user = await userRepository.findIdUser(id_user)
    if (!user) throw new Error ('User no encontrado')
    
    const comment = await commentRepository.findComment(id_comment)
    if (!comment) throw new Error ('Comment no encontrado')

    const likeExiste = await likesRepository.findLikeComment(id_user, id_comment)
    if (likeExiste) return null

    const like = await likesRepository.likePushComment({ id_user, id_comment })

    return like
  },

  likeRemoveComment: async ({ id_user, id_comment } : { id_user: string, id_comment: string }) => {
    const user = await userRepository.findIdUser(id_user)
    if (!user) throw new Error ('User no encontrado')
    
    const comment = await commentRepository.findComment(id_comment)
    if (!comment) throw new Error ('Comment no encontrado')

    const like = await likesRepository.findLikeComment(id_user, id_comment)
    if (!like) return

    const dislikeComment = await likesRepository.removeLikeComment(like.id_like)

    return dislikeComment
  }
}
