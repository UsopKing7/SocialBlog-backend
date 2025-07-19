import { Request, Response } from 'express'
import { loginServices } from '../services/login.service'
import { formatError } from '../utils/error.utils'
import { schemaLogin } from '../validation/login.validation'
import { generateTken } from '../utils/generateToken.utils'
import { tokenService } from '../services/token.service'

export const login = async (req: Request, res: Response) => {
  try {
    const response = schemaLogin.safeParse(req.body)
    if (!response.success) throw new Error('Error de validacion ' + response.error.issues.map(e => e.message).join(', '))
    const { email, password } = response.data
    
    const user = await loginServices.login({ email, password })
    const token = generateTken({ id_user: user.id_user, email: user.email })
    await tokenService.addToken({ id_user: user.id_user as string, token: token })

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.status(200).json({
      message: 'Login exitoso',
      user
    })
  } catch (error) {
    res.status(500).json({
      message: 'Algo salio mal',
      error: formatError(error)
    })
  }
}
