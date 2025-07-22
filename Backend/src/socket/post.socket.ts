import { Server, Socket } from 'socket.io'
import { postService } from '../services/posts.service'
import { formatError } from '../utils/error.utils'

export const socketPost = (socket: Socket, io: Server) => {
  // socket para publicaciones = Post
  socket.on('publicacion', async (data) => {
    try {
      const newPublicacion = await postService.createPostUser(data)
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
