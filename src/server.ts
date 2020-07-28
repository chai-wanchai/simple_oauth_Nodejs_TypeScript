import app from './app'
import * as http from 'http'
import * as dotenv from 'dotenv'
import { Database } from './common/database'
import config from '../config'

dotenv.config()
const server = http.createServer(app)

server.on('listening', async () => {
  try {
    console.log('server start ', server.address())
    const db = new Database()
    const dbService = await db.getConnection()

  } catch (error) {
    console.log(error)
  }
})
const port = process.env.PORT || config.url.port || 4000
server.listen(port)