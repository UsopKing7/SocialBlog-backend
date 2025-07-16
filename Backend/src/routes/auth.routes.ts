import { Router } from 'express'
import { login } from '../controllers/login.controller'
import { register } from '../controllers/register.controller'

export const router: Router = Router()

router.post('/login', login)
router.post('/register', register)
