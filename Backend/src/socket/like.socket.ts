import { Server, Socket } from 'socket.io'
import { likeService } from '../services/likes.service'
import { formatError } from '../utils/error.utils'
import { redis } from '../config/redis'
import { saveCache, verifyCache } from '../utils/cache.utils'

export const socketLike = (socket: Socket, io: Server) => {
  socket.on('like', async (data) => {
    try {
      const key = `like:${data.id_post}`
      const cache = await redis.get(key)

      const newLikeCache = verifyCache(cache)
      if (newLikeCache !== null) {
        io.emit('newLikeCache', newLikeCache)
        return
      }

      const newLike = await likeService.likePush(data)
      const { options, value } = saveCache(newLike)

      await redis.set(key, value, options)

      io.emit('NewLike', newLike)
    } catch (error) {
      socket.emit('ErrorEmitLike', {
        message: 'Error al poner el like',
        error: formatError(error)
      })
    }
  })
}
