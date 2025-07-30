import { userRepository } from '../repositories/usuarios.repository'

export const userServices = {
  getAllUsers: async () => {
    const users = await userRepository.getAll()
    if (!users) throw new Error ('Error al encontrar usuarios con permisos de [admin]')
    
    return users
  }
}
