import app from './app.js'
import config from './config.js'
import { connectToDatabase } from './db/connection.js'

const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`)
  })
}

start()
