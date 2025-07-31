import { NextFunction, Request, Response } from "express"
import { roleServices } from "../services/roles.service"
import { formatError } from "../utils/error.utils"

export const requiereRole = (allWebRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id_user = req.user?.id_user
      if (!id_user) throw new Error('Error al encontrar el id en el req')

      const roles = await roleServices.getUserRoles(id_user)
      const hasPermissin = roles.some(role => 
        allWebRoles.includes(role.name_role.toLowerCase())
      )

      if (!hasPermissin) {
        res.status(403).json({ message: 'No tienes permisos suficientes' })
        return
      }
      next()
    } catch (error) {
      res.status(401).json({ message: 'No autorizado', error: formatError(error) })
    }
  }
}
