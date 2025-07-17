import { roleRepository } from '../repositories/roles.repository'

export const roleService = {
  create: async (role: { name_role: string }) => {
    const rolExiste = await roleRepository.findRole(role.name_role)
    if (rolExiste) return rolExiste
    const newRole = await roleRepository.roleCreate({ name_rol: role.name_role })

    return newRole
  }
}
