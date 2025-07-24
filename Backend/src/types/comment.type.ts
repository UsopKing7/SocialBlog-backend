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
