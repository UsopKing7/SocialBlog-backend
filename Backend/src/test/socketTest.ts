import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('comment', {
    content: 'nuevo comentario para el post',
    id_author: "485d136b-3df7-4584-8805-5b0f692ab940",
    id_post: "82f87bb3-abe9-49e3-8206-2d98841a81bd",
  })
})

socket.on('nuevoComentario', (data) => {
  console.log('[cliente] Nuevo comentario recibido', data)
})
socket.on('ErrorEmitir', (err) => {
  console.error('[Cliente] Error emitido:', err)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Desconectado del servidor')
})
