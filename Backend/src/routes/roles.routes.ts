import { Router } from 'express'
import { userRoleCreate, getRolesUser } from '../controllers/roles.controller'
import { requiereRole } from '../middleware/role.middleware'
import { rutaProtected } from '../middleware/token.middleware'

export const routerRole = Router()

routerRole.post('/create/role/:id', userRoleCreate)
routerRole.get('/usuarios/:id_user/roles', rutaProtected, requiereRole(["ADMIN", "admin"]), getRolesUser)
