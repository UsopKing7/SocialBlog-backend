import { Router } from 'express'
import { postCreateUser, postUpdateUser, getAllPosts, getAllPostsIdUser, deletePostIdUser } from '../controllers/post.controller'

export const routerPost: Router = Router()

routerPost.post('/user/create-post/:id', postCreateUser) // ruta testeada con exito
routerPost.patch('/user/:id_author/update-post/:id_post', postUpdateUser) // ruta testeada con exito
routerPost.get('/posts', getAllPosts) // ruta testeada con exito
routerPost.get('/user/posts/:id_author', getAllPostsIdUser) // ruta testeada con exito
routerPost.delete('/user/:id_author/delete-post/:id_post', deletePostIdUser)
