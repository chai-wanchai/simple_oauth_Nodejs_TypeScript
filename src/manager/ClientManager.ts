import JWT from '../common/jwt'
import * as _ from 'lodash'
import { CommonError, ErrorHandle } from '../common/errorHandle'
import dbService from '../service/dbService'
import { IClient, IClientConfig } from '../types/client';
export class ClientManager {
  async addClient(clientName: string, createdBy: number, description?: string): Promise<IClient> {
    try {
      const data: IClient = {
        clientName: clientName,
        createdBy: createdBy,
        description: description
      }
      const result = await dbService.dbModelAuth.client.create(data)
      return result
    } catch (error) {
      throw error
    }
  }
  async updateClient(clientId: number, clientName: string, updatedBy: number, description?: string, isActive?: boolean) {
    try {
      const data: IClient = {
        clientName: clientName,
        updatedBy: updatedBy,
        description: description,
        isActive: isActive
      }
      const result = await dbService.dbModelAuth.client.update(data, { where: { clientId: clientId }, returning: true })
      return result[1] || result
    } catch (error) {
      throw error
    }
  }
  async deleteClient(clientId: number) {
    try {
      const resultDb = await dbService.dbModelAuth.client.destroy({ where: { clientId: clientId } })
      let result = {
        deleteSuccess: true,
        totalRows: resultDb
      }
      if (resultDb < 1) {
        result.deleteSuccess = false
      }
      return result
    } catch (error) {
      throw error
    }
  }
  async getAllClient() {
    try {
      const resultDb = await dbService.dbModelAuth.client.findAll()
      return resultDb
    } catch (error) {
      throw error
    }
  }
  async addConfigClient(clientId: number, configCode: string, configValue: string, createdBy: number, isActive?: boolean) {
    try {
      const data: IClientConfig = {
        clientId: clientId,
        configCode: configCode,
        configValue: configValue,
        createdBy: createdBy,
        isActive: isActive
      }
      const resultDb = await dbService.dbModelAuth.clientConfig.create(data)
      return resultDb
    } catch (error) {
      throw error
    }
  }
  async editConfigClient(clientId: number, configCode: string, configValue: string, updatedBy: number, isActive?: boolean) {
    try {
      const data: IClientConfig = {
        configValue: configValue,
        updatedBy: updatedBy,
        isActive: isActive
      }
      const resultDb = await dbService.dbModelAuth.clientConfig.update(data, { where: { configCode: configCode, clientId: clientId, }, returning: true })
      return resultDb
    } catch (error) {
      throw error
    }
  }
}
export default new ClientManager()