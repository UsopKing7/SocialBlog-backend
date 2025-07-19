import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { formatError } from '../utils/error.utils'
import { SECRET } from '../config/env'
import { RequestUser } from '../types/request.type'

export const rutaProtected = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token

  if (!token) throw new Error ('Token no proporcionado')
  
  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded as RequestUser
    next()
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
