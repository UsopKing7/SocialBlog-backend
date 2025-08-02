import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('post:create', {
    title: 'new title test socket',
    content: 'new content test socket',
    id_author: '7309ed09-44da-403e-b507-f569cd0a2224'
  })
})

socket.on('post:created', (data) => {
  console.log('[cliente] Nueva publicacion', data)
})
socket.on('post:error', (err) => {
  console.error('[Cliente] Error emitido:', err)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Desconectado del servidor')
})
