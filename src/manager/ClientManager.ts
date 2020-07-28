import JWT from '../common/jwt'
import * as _ from 'lodash'
import { CommonError, ErrorHandle } from '../common/errorHandle'
import dbService, { dbAuth } from '../service/dbService'
import { IClient, IClientConfig } from '../@types/client';
export class ClientManager {
  async addClient(clientName: string, createdBy: number, description?: string): Promise<IClient> {
    try {
      const data: IClient = {
        clientName: clientName,
        createdBy: createdBy,
        description: description
      }
      const result = await dbAuth.client.createClient(data)
      return result
    } catch (error) {
      throw error
    }
  }
  async updateClient(clientId: string, data: IClient) {
    try {
      const result = await dbAuth.client.updateClient(clientId,data)
      return result
    } catch (error) {
      throw error
    }
  }
  async deleteClient(clientId: string) {
    try {
      const resultDb = await dbAuth.client.deleteClient(clientId)     
      return resultDb
    } catch (error) {
      throw error
    }
  }
  async getAllClient() {
    try {
      const resultDb = await dbAuth.client.getAllClient()
      return resultDb
    } catch (error) {
      throw error
    }
  }
  // async addConfigClient(clientId: number, configCode: string, configValue: string, createdBy: number, isActive?: boolean) {
  //   try {
  //     const data: IClientConfig = {
  //       clientId: clientId,
  //       configCode: configCode,
  //       configValue: configValue,
  //       createdBy: createdBy,
  //       isActive: isActive
  //     }
  //     const resultDb = await dbAuth.client.create(data)
  //     return resultDb
  //   } catch (error) {
  //     throw error
  //   }
  // }
  // async editConfigClient(clientId: number, configCode: string, configValue: string, updatedBy: number, isActive?: boolean) {
  //   try {
  //     const data: IClientConfig = {
  //       configValue: configValue,
  //       updatedBy: updatedBy,
  //       isActive: isActive
  //     }
  //     const resultDb = await dbService.dbModelAuth.clientConfig.update(data, { where: { configCode: configCode, clientId: clientId, }, returning: true })
  //     return resultDb
  //   } catch (error) {
  //     throw error
  //   }
  // }
}
export default new ClientManager()