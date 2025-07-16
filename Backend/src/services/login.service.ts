import { prisma } from '../config/db'
import { UserDB } from '../types/user.type'
import bcrypt from 'bcrypt'

export const loginServices = {
  login: async (user: { email: string, password: string }): Promise<UserDB> => {
    const usuario = await prisma.user.findUnique({
      where: { email: user.email }
    })

    if (!usuario) throw new Error ('Error al encontrar el email del usuario')
    const validatePassword = await bcrypt.compare(user.password, usuario.password)
    if (!validatePassword) throw new Error ('Contraseña incorrecta')

    return {
      id_user: usuario.id_user,
      name: usuario.name,
      email: usuario.email,
      createdAt: usuario.created_at
    }
  }
}
