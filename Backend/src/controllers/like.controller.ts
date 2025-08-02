import { Request, Response } from 'express'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'
import { saveCache, verifyCache } from '../utils/cache.utils'
import { redis } from '../config/redis'

export const likeController = async (req: Request, res: Response) => {
  try {
    const { id_user, id_post } = req.params
    if (!id_user || !id_post) throw new Error ('Error al encontrar los Ids')
    
    const like = await likeService.likePush({ id_user: id_user, id_post: id_post })
    
    res.status(200).json({
      message: 'like puesto',
      like
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const likeRemove = async (req: Request, res: Response) => {
  try {
    const { id_user, id_post } = req.params
    if (!id_user || !id_post) throw new Error ('No se encontraron los Ids')

    const dislike = await likeService.likeRemove({ id_post, id_user })
    if (!dislike) throw new Error ('No se encontro el like')

    res.status(200).json({
      message: 'Like eliminado correctamete',
      dislike
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const likeComment = async (req: Request, res: Response) => {
  try {
    const { id_comment, id_user } = req.params
    if (!id_comment || !id_user) throw new Error ('Error al obtener los Ids')

    const like = await likeService.likePushComment({ id_comment, id_user })

    await Promise.all([
      redis.del(`likeComment:${id_comment}`)
    ])

    res.status(201).json({
      message: 'Like puesto al comentario',
      like
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const likeRemoveComment = async (req: Request, res: Response) => {
  try {
    const { id_comment, id_user } = req.params
    if (!id_comment || !id_user) throw new Error ('Error al encontrar los Ids')
    
    const dislike = await likeService.likeRemoveComment({ id_comment, id_user })
    if (!dislike) throw new Error ('Error al econtrar el like')

    res.status(200).json({
      message: 'Like eliminado correctamente',
      dislike
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const likeCountPost = async (req: Request, res: Response) => {
  try {
    const { id_post } = req.params
    if (!id_post) throw new Error ('Error al encontrar el post')

    const key = `likesPost:${id_post}`
    
    const cache = await redis.get(key)
    const cacheLikes = verifyCache(cache)

    if (cacheLikes !== null) {
      res.status(200).json({
        message: 'Total de likes del post (cache)',
        likes: cacheLikes
      })
      return
    }

    const likes = await likeService.likeCountPost(id_post)
    const { options, value} = saveCache(likes)

    await redis.set(key, value, options)

    res.status(200).json({
      message: 'Total de likes del post',
      likes
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const likeCountComment = async (req: Request, res: Response) => {
  try {
    const { id_comment } = req.params
    if (!id_comment) throw new Error ('Error al encontrar el Id')

    const key = `likeComment:${id_comment}`
    const cache = await redis.get(key)
    const likeComment = verifyCache(cache)
    if (likeComment !== null) {
      res.status(200).json({
        message: 'Likes del comentario (cache)',
        likes: likeComment
      })
      return
    }

    const likes = await likeService.likeContComments(id_comment)
    const { options, value } = saveCache(likes)
    await redis.set(key, value, options)

    res.status(200).json({
      message: 'Likes del comentario',
      likes
    })
    
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}