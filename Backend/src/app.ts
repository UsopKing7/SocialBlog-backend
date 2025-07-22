import { PORT } from './config/env'
import { server} from './server'

server.listen(PORT, () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})

