import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('publicacion', {
    title: 'Post desde TS',
    content: 'Este es un post de prueba',
    id_author: "61c96ca3-bbb0-4fab-89af-07f0adef7a87"
  })
})

socket.on('nuevaPublicacion', (data) => {
  console.log('[Cliente] Nueva publicación recibida:', data)
})

socket.on('ErrorEmitir', (err) => {
  console.error('[Cliente] Error emitido:', err)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Desconectado del servidor')
})
