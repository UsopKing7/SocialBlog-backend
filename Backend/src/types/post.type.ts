// Interface para Post = publicacion
export interface PostDb {
  title: string
  content: string
  id_author: string
}

// Interface para el update Post = publicacion actualizada
export interface UpdatePostDb {
  title?: string,
  content?: string
}
