import { Request, Response } from 'express'
import { registerServices } from '../services/register.service'
import { schemaRegister } from '../validation/register.validation'
import { formatError } from '../utils/error.utils'

export const register = async (req: Request, res: Response) => {
  try {
    const response = schemaRegister.safeParse(req.body)
    if (!response.success) throw new Error ('Error de validacion ' + response.error.issues.map(e => e.message).join(', '))

    const { name, email, password } = response.data
    const user = await registerServices.register({ name, email, password })

    res.status(201).json(user.message)
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
