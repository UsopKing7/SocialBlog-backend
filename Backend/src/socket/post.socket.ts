import { Server, Socket } from 'socket.io'
import { postService } from '../services/posts.service'
import { formatError } from '../utils/error.utils'
import { redis } from '../config/redis'

export const socketPost = (socket: Socket, io: Server) => {
  // socket para publicaciones = Post
  socket.on('post:create', async (data) => {
    try {
      const newPost = await postService.createPostUser(data)

      await Promise.all([
        redis.del('posts'),
        redis.del(`getPostsIdUser:${data.id_author}`)
      ])

      io.emit('post:created', newPost)
    } catch (error) {
      console.log('[-] Error al emitir la publicacion', formatError(error))
      
      socket.emit('post:error', {
        message: 'Erro socket',
        error: formatError(error)
      })
    }
  })
  socket.on('disconnect', () => {
    console.log('[!] User disconnected')
  })
}
