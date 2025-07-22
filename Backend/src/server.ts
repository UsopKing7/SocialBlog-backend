import express from 'express'
import http from 'node:http'
import { Server as SocketServer } from 'socket.io'
import { router } from './routes/auth.routes'
import { routerRole } from './routes/roles.routes'
import { socketPost } from './socket/post.socket'
import { routerPost } from './routes/post.routes'

const app = express()

export const server = http.createServer(app)
export const io = new SocketServer(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: [ 'GET', 'POST', 'PATCH', 'DELETE' ]
  }
})

app.use(express.json())

io.on('connection', (socket) => {
  console.log('[+] New user logged in')
  socketPost(socket, io)
})
app.use('/api', router)
app.use('/api', routerRole)
app.use('/api', routerPost)
