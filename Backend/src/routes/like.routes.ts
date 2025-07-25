import { likeComment, likeController, likeRemove, likeRemoveComment } from '../controllers/like.controller'
import { Router } from 'express'

export const routerLike = Router()

routerLike.post('/user/:id_user/post/:id_post/like', likeController)
routerLike.delete('/user/:id_user/post/:id_post/dislike', likeRemove)
routerLike.post('/user/:id_user/comment/:id_comment/like', likeComment)
routerLike.delete('/user/:id_user/comment/:id_comment/dislike', likeRemoveComment)