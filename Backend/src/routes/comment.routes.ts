import { Router } from 'express'
import { commentCreate, commentUpdate, getComments, deleteComment } from '../controllers/comment.controller'

export const routerComment = Router()

routerComment.post('/user/:id_author/post/:id_post/create-comment', commentCreate)
routerComment.patch('/user/:id_author/post/:id_post/comment/:id_comment/update-comment', commentUpdate)
routerComment.get('/posts/comments/:id_post', getComments)
routerComment.delete('/user/:id_author/post/:id_post/comment/:id_comment/delete-comment', deleteComment)
