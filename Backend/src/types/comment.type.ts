// Interface para crear un commentario
export interface CreateCommentDB {
  content: string
  id_post: string
  id_author: string
}

// Interface para actualizar un comentario
export interface UpdaeCommentDB {
  content?: string 
  id_comment: string
  id_post: string
  id_author: string
}
// Interface para eliminar un commentario
export interface DeleteCommentDB {
  id_comment: string
  id_post: string
  id_author: string
}
 
// Interface Comment para owner
export interface Comment {
  id_post: string
  id_comment: string
  id_author: string
}
