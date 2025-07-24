import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('comment', {
    content: 'nuevo comentario para el post',
    id_author: "b244faf7-5122-44fb-8b52-68edb65d1952",
    id_post: "893c96c6-6e58-4f59-84e0-3753b01dd7ab",
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
