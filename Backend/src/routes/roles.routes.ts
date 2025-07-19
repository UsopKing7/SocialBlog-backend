import { Router } from 'express'
import { userRoleCreate } from '../controllers/roles.controller'

export const routerRole = Router()

routerRole.post('/create/role/:id', userRoleCreate)
