export interface UserDB {
  id_user: string
  name: string
  email: string
  password?: string
  createdAt: Date
}

// interface para Create User
export interface UserCreate {
  name: string
  email: string
  password: string
}
