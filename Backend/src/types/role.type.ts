// interface para asignar role por id user y por role
export interface UserRoleCreate {
  id_user: string
  id_role: string
}

// interface para crear role
export interface CreateRole {
  name_role: string
}
