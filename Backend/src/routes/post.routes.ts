import { Router } from 'express'
import { postCreateUser, postUpdateUser, getAllPosts, getAllPostsIdUser, deletePostIdUser } from '../controllers/post.controller'

export const routerPost: Router = Router()

routerPost.post('/user/create-post/:id', postCreateUser)
routerPost.patch('/user/:id_author/update-post/:id_post', postUpdateUser)
routerPost.get('/posts', getAllPosts)
routerPost.get('/user/posts/:id_author', getAllPostsIdUser)
routerPost.delete('/user/:id_author/delete-post/:id_post', deletePostIdUser)
