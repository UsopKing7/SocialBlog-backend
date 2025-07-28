import { Server, Socket } from 'socket.io'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'
import { redis } from '../config/redis'
import { saveCache, verifyCache } from '../utils/cache.utils'

export const socketLikeComment = async (socket: Socket, io: Server) => {
  socket.on('likeComment', async (data) => {
    try {
      const key = `likeComment:${data.id_comment}`
      const cache = await redis.get(key)

      const newLikeCache = verifyCache(cache)
      if (newLikeCache !== null) {
        io.emit('newLikeCache', newLikeCache)
        return
      }

      const newLike = await likeService.likePushComment(data)
      const { options, value } = saveCache(newLike)

      await redis.set(key, value, options)

      io.emit('newLikeComment', newLike)
    } catch (error) {
      socket.emit('errorEmitLikeComment', {
        message: 'Error al emitir like comment',
        error: formatError(error)
      })
    }
  })
}