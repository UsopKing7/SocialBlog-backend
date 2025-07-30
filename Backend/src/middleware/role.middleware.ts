import { NextFunction, Request, Response } from "express"
import { roleServices } from "../services/roles.service"

export const requiereRole = (allWebRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user.id_user
      if (!id) throw new Error('Error al encontrar el id en el req')

      const roles = await roleServices.getUserRoles(id)
      console.log('ROLES DEL USUARIO:', roles)
      const hasPermissin = roles.some(r => allWebRoles.includes(r.name_role))

      if (!hasPermissin) throw new Error('Acceso denegado')

      next()
    } catch (error) {
      res.status(401).json({ message: 'No autorizado', error: String(error) })
    }
  }
}
