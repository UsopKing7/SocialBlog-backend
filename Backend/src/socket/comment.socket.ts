import { Server, Socket } from 'socket.io'
import { formatError } from '../utils/error.utils'
import { commentService } from '../services/comment.service'

export const socketComents = (socket: Socket, io: Server) => {
  // socket para comentarios = comments

  socket.on('comment', async (data) => {
    try {
      const newComment = await commentService.createCommentPost(data)
      io.emit('nuevoComentario', newComment)
    } catch (error) {
      console.log('[-] Error al emitir la publicacion')
      formatError(error)
      socket.emit('ErrorEmitir', {
        message: 'Error socket',
        error: formatError(error)
      })          
    }
  })
}
