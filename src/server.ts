import app from './app'
import http from 'http'
import dotenv from 'dotenv'
import { Database } from './common/database'
import dbModel from './service/dbService'
import config from '../config'

dotenv.config()
const server = http.createServer(app)

server.on('listening', () => {
  try {
    console.log('server start ', server.address())
    const dbConfig = new Database(config.postgres.dbUrl)
    const dbService = dbConfig.init()
    Object.values(dbModel).forEach(async (instanceDB) => {
      try {
        Object.values(instanceDB).forEach(async (model) => {
          const result = await model.sync({ alter: true })
          console.log(result)
          console.log(`Sync Table : ${model.tableName} complete!!`)
        })
      } catch (error) {
        console.log(error, '**********************')
      }
    })
  } catch (error) {
    console.log(error)
  }

})
server.listen(process.env.PORT || 3000)