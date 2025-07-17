import { Router } from 'express'
import { createRole } from '../controllers/roles.controller'

export const routerRole = Router()

routerRole.post('/create/role/:id', createRole)
