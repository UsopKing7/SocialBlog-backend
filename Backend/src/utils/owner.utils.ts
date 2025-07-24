import { Comment } from '../types/comment.type'

export const isCommentOwnedBy = (comment: Comment, id_post: string, id_author: string) => {
  return comment.id_post === id_post && comment.id_author === id_author
} 