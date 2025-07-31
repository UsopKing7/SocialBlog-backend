import { roleRepository } from '../repositories/roles.repository'
import { userRepository } from '../repositories/user.repository'

export const roleServices = {
  createUserRole: async (role: { id_role: string, id_user: string, name_role: string }) => {
    const userExiste = await userRepository.findIdUser(role.id_user)
    if (!userExiste) throw new Error('Error al encontrar el usuario por el id')

    let roleExiste = await roleRepository.findRoleName(role.name_role)
    if (!roleExiste) return roleExiste = await roleRepository.createRole({ name_role: role.name_role })

    const newUserRole = await roleRepository.createUserRole({
      id_role: roleExiste.id_role,
      id_user: role.id_user
    })

    return newUserRole
  },

  getUserRoles: async (id_user: string) => {
    const roles = await roleRepository.getRolesUser(id_user)
    if (!roles || roles.length === 0) throw new Error ('El usuario no tiene roles asignados')

    return roles 
  }
}
