import z from 'zod'

export const schemaLogin = z.object({
  email: z
    .string()
    .min(5, {
      message: 'El correo electrónico debe tener al menos 5 caracteres'
    })
    .max(100, {
      message: 'El correo electrónico no puede exceder los 100 caracteres'
    })
    .email({
      message: 'Por favor ingresa un correo electrónico válido'
    }),

  password: z
    .string()
    .min(8, {
      message: 'La contraseña debe tener al menos 8 caracteres'
    })
    .max(50, {
      message: 'La contraseña no puede exceder los 50 caracteres'
    })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe contener al menos una mayúscula'
    })
    .regex(/[a-z]/, {
      message: 'La contraseña debe contener al menos una minúscula'
    })
    .regex(/[0-9]/, {
      message: 'La contraseña debe contener al menos un número'
    })
    .regex(/[^A-Za-z0-9]/, {
      message: 'La contraseña debe contener al menos un carácter especial'
    })
})
