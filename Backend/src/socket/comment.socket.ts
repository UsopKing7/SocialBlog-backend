import { Server, Socket } from 'socket.io'
import { formatError } from '../utils/error.utils'
import { commentService } from '../services/comment.service'
import { saveCache, verifyCache } from '../utils/cache.utils'
import { redis } from '../config/redis'

export const socketComents = (socket: Socket, io: Server) => {
  // socket para comentarios = comments
  socket.on('comment', async (data) => {
    try {
      const key = `comment:${data.id_comment}`
      const cache = await redis.get(key)

      const newCommentCache = verifyCache(cache)
      if (newCommentCache !== null) {
        io.emit('newCommentCache', newCommentCache)
        return
      }

      const newComment = await commentService.createCommentPost(data)
      const { options, value } = saveCache(newComment)

      await redis.set(key, value, options)
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
