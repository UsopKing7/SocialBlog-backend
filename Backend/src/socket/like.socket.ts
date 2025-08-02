import { Server, Socket } from 'socket.io'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'

export const socketLike = (socket: Socket, io: Server) => {
  socket.on('likePost:create', async (data) => {
    try {
      const newLike = await likeService.likePush(data)
      io.emit('likePost:created', newLike)
    } catch (error) {
      socket.emit('ErrorEmitLike', {
        message: 'Error al poner el like',
        error: formatError(error)
      })
    }
  })
}
