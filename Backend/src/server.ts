import express from 'express'
import http from 'node:http'
import { Server as SocketServer } from 'socket.io'
import { router } from './routes/auth.routes'
import { routerRole } from './routes/roles.routes'
import { socketPost } from './socket/post.socket'
import { routerPost } from './routes/post.routes'
import { routerComment } from './routes/comment.routes'
import { socketComents } from './socket/comment.socket'
import { socketLike } from './socket/like.socket'
import { routerLike } from './routes/like.routes'
import { socketLikeComment } from './socket/like-comment.socket'
import cookieParser from 'cookie-parser'
import { routerReport } from './routes/report.routes'

export const app = express()
app.use(cookieParser())

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
  socketComents(socket, io)
  socketLike(socket, io)
  socketLikeComment(socket, io)
})

app.use('/api', router)
app.use('/admin', routerRole)
app.use('/api', routerPost)
app.use('/api', routerComment)
app.use('/api', routerLike)
app.use('/admin', routerReport)
