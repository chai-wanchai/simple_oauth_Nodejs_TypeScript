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
  //   Object.values(dbModel).forEach(async (instanceDB) => {
  //     try {
  //       Object.values(instanceDB).forEach(async (model) => {
  //         const result = await model.sync({ alter: true })
  //         console.log(result)
  //         console.log(`Sync Table : ${model.tableName} complete!!`)
  //       })
  //     } catch (error) {
  //       console.log(error, '**********************')
  //     }
  //   })
  //   try {
  //     const defaultClient = {
  //       clientId: 1,
  //       clientSecret: process.env.SERVER_OAUTH_SECRATE || 'oauth_password',
  //       clientName: 'oauth_admin',
  //       description: 'This is default Client for our system'
  //     }
  //     const AdminUser = {
  //       username: 'admin',
  //       password: AuthManager.encodePassword('P@ssw0rd'),
  //       firstName: 'OAuth',
  //       lastName: 'Admin'
  //     }
  //     await dbModel.dbModelAuth.client.findOrCreate({ where: { clientSecret: `${process.env.SERVER_OAUTH_SECRATE}` }, defaults: defaultClient })
  //     await  dbModel.dbModelAuth.users.findOrCreate({ where: { username: AdminUser.username }, defaults: AdminUser })
  //   } catch (error) {
  //     console.log(error, '------------- Error Insert data')
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
})
const port = process.env.PORT || config.url.port || 3000
server.listen(port)