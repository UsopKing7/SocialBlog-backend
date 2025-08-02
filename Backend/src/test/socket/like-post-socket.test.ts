import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] connectado con el ID', socket.id)

  socket.emit('likePost:create', {
    id_user: '7309ed09-44da-403e-b507-f569cd0a2224',
    id_post: 'ada097c4-f10e-427d-9616-813cfee581ad'
  })
})

socket.on('likePost:created', (data) => {
  console.log('[Cliente] nuevo like al post', data)
})

socket.on('likePost:error', (error) => {
  console.log('[Cliente] Error al emitir', error)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Usuario desconectado del servidor')
})
