import bcrypt from 'bcrypt'
import { SAL } from '../config/env'
import { postRepository } from '../repositories/autch.repository'
import { UserCreate } from '../types/user.type'

export const registerServices = {
  register: async (user: UserCreate) => {
    const hashPassword = await bcrypt.hash(user.password, SAL)
    const result = await postRepository.createUser({
      name: user.name,
      email: user.email,
      password: hashPassword
    })

    if (!result) throw new Error('Error no se encontro nada en el body')
    return { message: 'Registro exitoso' }
  }
}
