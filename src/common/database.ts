import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import config from '../../config';
dotenv.config()
var pg = require('pg');
pg.defaults.ssl = true;
export interface DBInterface {
  connection: Sequelize;
}
export class Database {
  private connectionConfig: any = null
  public connection: Sequelize = new Sequelize(`${process.env.DATABASE_URL}`, { ssl: true, logging: false })
  constructor(connectionString?: string, database?: string, username?: string, password?: string, host?: string, dialect?: string) {
    let stringConntection = process.env.DATABASE_URL as string;
    if (connectionString) {
      stringConntection = connectionString;
    } else {
      stringConntection = `${dialect || 'postgres'}://${username}:${password}@${host}`;
    }
    this.connectionConfig = stringConntection;
  }
  public init() {
    this.connection = new Sequelize(this.connectionConfig, { ssl: true, logging: false })
    this.connection.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');       
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:\n', err);
      });
    return this.connection
  } 
}
const db = new Database(config.postgres.dbUrl)
export default db