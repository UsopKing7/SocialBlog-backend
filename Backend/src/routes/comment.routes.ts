import { Router } from 'express'
import { commentCreate } from '../controllers/comment.controller'

export const routerComment = Router()

routerComment.post('/user/:id_author/post/:id_post/create-comment', commentCreate)
