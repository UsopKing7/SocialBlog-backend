import { Server, Socket } from 'socket.io'
import { formatError } from '../utils/error.utils'
import { commentService } from '../services/comment.service'
import { redis } from '../config/redis'

export const socketComents = (socket: Socket, io: Server) => {
  // socket para comentarios = comments
  socket.on('comment:create', async (data) => {
    try {
      const newComment = await commentService.createCommentPost(data)

      await Promise.all([
        redis.del(`commentGetPost:${data.id_post}`)
      ])
      io.emit('comment:created', newComment)
    } catch (error) {
      console.log('[-] Error al emitir la publicacion')
      formatError(error)
      socket.emit('comment:error', {
        message: 'Error socket',
        error: formatError(error)
      })          
    }
  })
}
