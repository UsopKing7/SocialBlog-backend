import { PrismaClient } from '@prisma/client'
import { formatError } from '../utils/error.utils'

export const prisma = new PrismaClient()

const verifyConnect = async () => {
  try {
    await prisma.$connect()
    console.log('[+] Database conectada ')
  } catch (error) {
    console.log(formatError(error))
  }
}

process.on('SIGINT', async () => {
  console.log('[+] intentando cerrar la base de datos')
  try {
    await prisma.$disconnect()
    console.log('[!] Coneccion serrada a la base de datos')
    process.exit(0)
  } catch (error) {
    console.log(formatError(error))
    process.exit(1)
  }
})

verifyConnect()