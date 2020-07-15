import { Sequelize } from 'sequelize'
import config from '../../config';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
var pg = require('pg');
pg.defaults.ssl = true;
export interface DBInterface {
  connection: Sequelize;
}
export class Database {
 
  public async getConnection() {
    const connection = await createConnection(this.getOption())
    return connection
  }
  public getOption() {
    const options: ConnectionOptions = {
      type: 'postgres',
      host: config.postgres.host,
      port: config.postgres.port,
      username: config.postgres.username,
      password: config.postgres.password,
      database: config.postgres.database,
      entities: [
        __dirname + '/entities/table/*.ts'
      ],
      extra: {
        options: {
          encrypt: true
        },
        max: 20 /* Number of max pool */
      },
      logging: true,
      synchronize: process.env.NODE_ENV === 'localhost' ? true : false
    };
    return options;
  }

}
const db = new Database()
export default db