import { PORT } from './config/env'
import { server} from './server'
import { connectRedis } from './config/redis'

connectRedis()

server.listen(PORT, () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})

