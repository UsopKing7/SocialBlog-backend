import jwt from 'jsonwebtoken'
import { SECRET } from '../config/env'

export const generateTken = (payload: {id_user: string, email: string }) => {
  return jwt.sign(payload, SECRET, {
    expiresIn: '7d'
  })
}
