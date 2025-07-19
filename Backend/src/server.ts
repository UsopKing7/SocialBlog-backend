import express from 'express'
import { router } from './routes/auth.routes'
import { routerRole } from './routes/roles.routes'

export const app = express()
app.use(express.json())
app.use('/api', router)
app.use('/api', routerRole)
