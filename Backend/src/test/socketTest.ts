import { io } from 'socket.io-client'

const socket = io('http://localhost:3333', {
  transports: ['websocket'],
  reconnection: false
})

socket.on('connect', () => {
  console.log('[Cliente] Conectado con ID:', socket.id)

  socket.emit('likeComment', {
    id_user: "b244faf7-5122-44fb-8b52-68edb65d1952",
    id_comment: "0057c28c-c4a3-483b-b968-02ba507d91b8",
  })
})

socket.on('newLikeComment', (data) => {
  console.log('[cliente] Nuevo like para el comment', data)
})
socket.on('ErrorEmitLikeComment', (err) => {
  console.error('[Cliente] Error emitido:', err)
})

socket.on('disconnect', () => {
  console.log('[Cliente] Desconectado del servidor')
})
