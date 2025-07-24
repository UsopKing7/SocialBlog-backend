import { Request, Response } from 'express'
import { commentService } from '../services/comment.service'
import { formatError } from '../utils/error.utils'
import { commentCreateValidation, commentUpdateValidation } from '../validation/comment.validation'

export const commentCreate = async (req: Request, res: Response) => {
  try {
    const { id_author, id_post } = req.params
    if (!id_author || !id_post) throw new Error ('Error al encontrar los Ids')

    const response = commentCreateValidation.safeParse(req.body)
    if (!response.success)
      throw new Error ('Error de validacion: ' + response.error.issues.map(e => e.message).join(', '))

    const { content } = response.data
    const newComment = commentService.createCommentPost({ content: content, id_author: id_author, id_post: id_post }) 

    res.status(201).json({
      message: `Comment creado a post ${id_post}`,
      newComment
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const commentUpdate = async (req: Request, res: Response) => {
  try {
    const { id_author, id_comment, id_post } = req.params
    if (!id_author || !id_comment || !id_post ) throw new Error ('Error al encontrar los Ids')

    const response = commentUpdateValidation.safeParse(req.body)
    if (!response.success) throw new Error ('Error de validacion: ' + response.error.issues.map(e => e.message).join(' ,'))
    
    const { content } = response.data
    if (!content) throw new Error ('El comentario no puede estar vacio')
    const newComment = await commentService.updateCommentPost({ content, id_author, id_comment, id_post })

    res.status(200).json({
      message: 'Comentario actualizado',
      newComment
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { id_post } = req.params
    if (!id_post) throw new Error ('Error al encontrar el Id')

    const comments = await commentService.getCommetsPost(id_post)

    res.status(200).json({
      message: 'Comentarios del post',
      comments
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id_author, id_post, id_comment } = req.params
    if (!id_author || !id_post || !id_comment) throw ('Error al encontrar los Ids')

    const deleteComment = await commentService.deleteComment({ id_author, id_post, id_comment })

    if (!deleteComment) throw new Error ('Error al eliminar el comment')
    
    res.status(200).json({
      message: 'Comment eliminado correctamente',
      deleteComment
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
