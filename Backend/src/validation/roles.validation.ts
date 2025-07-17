import z from 'zod'

export const roleCreateValidation = z.object({
  name_role: z
    .string()
    .min(3, {
      message: 'El name del role debe tener minimo 3 caracteres'
    })
    .max(10, {
      message: 'El nombre del role debe tener maximo de 10 caracteres'
    })
})
