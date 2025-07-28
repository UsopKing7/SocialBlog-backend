import { Server, Socket } from 'socket.io'
import { postService } from '../services/posts.service'
import { formatError } from '../utils/error.utils'
import { saveCache, verifyCache } from '../utils/cache.utils'
import { redis } from '../config/redis'

export const socketPost = (socket: Socket, io: Server) => {
  // socket para publicaciones = Post
  socket.on('publicacion', async (data) => {
    try {
      const key = `post:${data.id_post}`
      const cache = await redis.get(key)

      const newPublicacionCache = verifyCache(cache)
      if (newPublicacionCache !== null) {
        io.emit('newPublicacionCache', newPublicacionCache)
        return
      }

      const newPublicacion = await postService.createPostUser(data)
      const { options, value } = saveCache(newPublicacion)

      await redis.set(key, value, options)
      io.emit('nuevaPublicacion', newPublicacion)
    } catch (error) {
      console.log('[-] Error al emitir la publicacion', formatError(error))

      socket.emit('ErrorEmitir', {
        message: 'Erro socket',
        error: formatError(error)
      })
    }
  })
  socket.on('disconnect', () => {
    console.log('[!] User disconnected')
  })
}
