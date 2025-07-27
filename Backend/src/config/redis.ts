import { createClient } from 'redis'
import { REDIS } from './env'
import { formatError } from '../utils/error.utils'

export const redis = createClient({
  url: REDIS
})

redis.on('connect', () => { console.log('[+] Redis connectado')})

redis.on('error', (error) => console.log(formatError(error)))

export const connectRedis = async () => {
  try {
    await redis.connect()
  } catch (error) {
    console.log(formatError(error))
  }
}
