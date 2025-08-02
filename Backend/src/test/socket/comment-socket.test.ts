import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('comment:create', {
    content: 'new comment para el test socket',
    id_author: '7309ed09-44da-403e-b507-f569cd0a2224',
    id_post: '9c4e44ae-1bf7-41d4-a255-eeee6f3f7aa9'
  })
})

socket.on('comment:created', (data) => {
  console.log('[Cliente] Nuevo commentario', data)
})

socket.on('comment:error', (error) => {
  console.log('[Cliente] Error emitido: ', error)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Desconectado del servidor')
})
