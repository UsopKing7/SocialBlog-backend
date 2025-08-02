import { Server, Socket } from 'socket.io'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'
import { redis } from '../config/redis'

export const socketLikeComment = async (socket: Socket, io: Server) => {
  socket.on('likeComment:create', async (data) => {
    try {
      const newLike = await likeService.likePushComment(data)

      await Promise.all([
        redis.del(`likeComment:${data.id_comment}`)
      ])

      io.emit('likeComment:created', newLike)
    } catch (error) {
      socket.emit('likeComment:error', {
        message: 'Error al emitir like comment',
        error: formatError(error)
      })
    }
  })
}