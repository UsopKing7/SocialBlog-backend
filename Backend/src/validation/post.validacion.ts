import z from 'zod'

export const postCreateValidacion = z.object({
  title: z
    .string()
    .min(3, {
      message: 'EL title debe tener minimo de 3 caracteres'
    })
    .max(50, {
      message: 'El Title debe tener un maximo de 500 caracteres'
    }),

  content: z
    .string()
    .min(6, {
      message: 'El content debe tener un minimo de 6 caracteres'
    })
    .max(500, {
      message: 'El content debe tener un maximo de 500 caracteres'
    })
})

export const postUpdateValidacion = z.object({
  title: z
    .string()
    .min(3, {
      message: 'EL title debe tener minimo de 3 caracteres'
    })
    .max(50, {
      message: 'El Title debe tener un maximo de 500 caracteres'
    })
    .optional(),

  content: z
    .string()
    .min(6, {
      message: 'El content debe tener un minimo de 6 caracteres'
    })
    .max(500, {
      message: 'El content debe tener un maximo de 500 caracteres'
    })
    .optional()
})
