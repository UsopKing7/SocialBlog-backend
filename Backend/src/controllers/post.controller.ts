import { redis } from '../config/redis'
import { postService } from '../services/posts.service'
import { formatError } from '../utils/error.utils'
import { postCreateValidacion, postUpdateValidacion } from '../validation/post.validacion'
import { Request, Response } from 'express'

export const postCreateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const response = postCreateValidacion.safeParse(req.body)

    if (!id) throw new Error ('Error al obtener el id del parametro')
    if (!response.success) throw new Error ('Error de validacion: ' + response.error.issues.map(e => e.message).join(', '))

    const { title, content } = response.data
    const newPost = await postService.createPostUser({ title, content, id_author: id})

    res.status(201).json({
      message: 'Post creado correctamente',
      newPost
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })   
  }
}

export const postUpdateUser = async (req: Request, res: Response) => {
  try {
    const { id_author, id_post } = req.params
    const response = postUpdateValidacion.safeParse(req.body)

    if (!id_author || !id_post) throw new Error ('Error al encontrar los Ids')
    if (!response.success) throw new Error('Error de validacion: ' + response.error.issues.map(e => e.message).join(', '))
    
    const { content, title } = response.data
    const updateData: {
      id_author: string
      id_post: string
      title?: string
      content?: string
    } = {
      id_author,
      id_post,
      ...(title !== undefined && { title}),
      ...(content !== undefined && { content })
    }

    const updatePost = await postService.updatePostUser(updateData)

    res.status(200).json({
      message: 'Post actualizado',
      updatePost
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const cache = await redis.get('posts')
    if (cache) {
      const posts = JSON.parse(cache)
      res.status(200).json({
        message: 'Resùesta desde redis',
        posts
      })
      return 
    }
    const posts = await postService.getAllPost()

    await redis.set('posts', JSON.stringify(posts), { EX: 60 })

    res.status(200).json({
      message: 'todos los Posts',
      posts
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const getAllPostsIdUser = async (req: Request, res: Response) => {
  try {
    const { id_author } = req.params
    if (!id_author) throw new Error ('Error al obtener el id')
    
    const postsUser = await postService.getAllPostId({ id_author })

    res.status(200).json({
      message: `Posts del usuario ${id_author}`,
      postsUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })   
  }
}

export const deletePostIdUser = async (req: Request, res: Response) => {
  try {
    const { id_author, id_post } = req.params
    if (!id_author || !id_post) throw new Error ('Error al obtener los Ids')

    const postDelete = await postService.deletePostId({ id_author, id_post })

    res.status(200).json({
      message: 'Post eliminado',
      postDelete
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}