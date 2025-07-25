import { Server, Socket } from 'socket.io'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'

export const socketLikeComment = async (socket: Socket, io: Server) => {
  socket.on('likeComment', async (data) => {
    try {
      const newLike = await likeService.likePushComment(data)
      io.emit('newLikeComment', newLike)
    } catch (error) {
      socket.emit('errorEmitLikeComment', {
        message: 'Error al emitir like comment',
        error: formatError(error)
      })
    }
  })
}