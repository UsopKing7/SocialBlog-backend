import { roleServices } from '../services/roles.service'
import { formatError } from '../utils/error.utils'
import { roleCreateValidation } from '../validation/roles.validation'
import { Request, Response } from 'express'

export const userRoleCreate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const respuesta = roleCreateValidation.safeParse(req.body)
    if (!id) throw new Error ('Error al encontrar el id')
    if (!respuesta.success) throw new Error ('Erro de validacion: ' + respuesta.error.issues.map(e => e.message).join(', '))

    const { name_role } = respuesta.data
    const newRole = await roleServices.createUserRole({ id_user: id, name_role, id_role: name_role })

    res.status(201).json({
      message: `rol creado correctamente al id ${id}}` ,
      newRole
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
