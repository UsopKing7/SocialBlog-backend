import { PORT } from './config/env'
import { app } from './server'

app.listen(PORT, () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})
