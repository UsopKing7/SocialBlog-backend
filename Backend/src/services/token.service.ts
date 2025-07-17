import { tokenRepository } from '../repositories/toeken.repository'
import { userRepository } from '../repositories/user.repository'
export const tokenService = {
  addToken: async (token: { id_user: string, token: string }) => {
    const userExiste = await userRepository.findIdUser(token.id_user)
    if (!userExiste) throw new Error ('No se pudo encontrar el id_user')
    
    await tokenRepository.addToken({ id_user: token.id_user, token: token.token })

    return "Token guardado"
  }
}
