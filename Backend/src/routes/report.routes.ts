import { createRepor, reportes } from '../controllers/report.controller'
import { rutaProtected } from '../middleware/token.middleware'
import { requiereRole } from '../middleware/role.middleware'
import { Router } from 'express'

export const routerReport = Router()

routerReport.post('/user/:id_reporter/comments/:id_comment', createRepor)
routerReport.get('/user/:id_reporter/reports', rutaProtected, requiereRole(['admin']), reportes)
