import { prisma } from '../config/db'
import bcrypt from 'bcrypt'
import { SAL } from '../config/env'

export const registerServices = {
  register: async (user: { name: string, email: string, password: string }) => {
    const hashPassword = await bcrypt.hash(user.password, SAL)
    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword
      }
    })

    if (!result) throw new Error('Error no se encontro nada en el body')

    return { message: 'Registro exitoso' }
  }
}
