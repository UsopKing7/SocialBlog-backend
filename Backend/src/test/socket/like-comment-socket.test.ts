import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] connectado con ID', socket.id)

  socket.emit('likeComment:create', {
    id_user: '7309ed09-44da-403e-b507-f569cd0a2224',
    id_comment: '8cbe926c-4ba7-4541-ae01-fbd19d672266'
  })
})

socket.on('likeComment:created', (data) => {
  console.log('[Cliente] Nuevo like en el comentario', data)
})

socket.on('likeComment:error', (error) => {
  console.log('[Cliente] Error emitido', error)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Usuario desconectado del servidor')
})
