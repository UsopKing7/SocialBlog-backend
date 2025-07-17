import { roleService } from '../services/roles.service'
import { formatError } from '../utils/error.utils'
import { roleCreateValidation } from '../validation/roles.validation'
import { Request, Response } from 'express'

export const createRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const respuesta = roleCreateValidation.safeParse(req.body)
    if (!respuesta.success) throw new Error ('Error de validacion: ' + respuesta.error.issues.map(e => e.message).join(', '))
    if (!id) throw new Error ('Error al obtener el id del usuario')

    const { name_role } = respuesta.data
    const newRole = await roleService.create({ name_role })

    res.status(201).json({
      message: 'role creado correctamente',
      newRole
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}