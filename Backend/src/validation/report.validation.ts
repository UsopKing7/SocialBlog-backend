import z from 'zod'

export const reportValidation = z.object({
  reason: z
    .string()
    .min(3, {
      message: 'La razon debe tener como minimo 3 caracteres'
    })
    .max(255, {
      message: 'La razon debe tener como maximo 255 caracteres'
    })
})
