import z from 'zod'

export const commentCreateValidation = z.object({
  content: z
    .string()
    .min(3, {
      message: 'El comentario debe tener como minimo 3 caracteres'
    })
    .max(255, {
      message: 'El comentario debe tener como maximo 255 caracteres'
    })
})

export const commentUpdateValidation = z.object({
  content: z
    .string()
    .min(3, {
      message: 'El comentario debe tener como minimo 3 caracteres'
    })
    .max(255, {
      message: 'El comentario debe tener como maximo 255 caracteres'
    })
    .optional()
})