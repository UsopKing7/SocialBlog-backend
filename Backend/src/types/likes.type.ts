// Interface para poner un like a un post
export interface LikePushPostDB {
  id_user: string
  id_post: string
}

export interface LikePushCommentDB {
  id_user: string
  id_comment: string
}
