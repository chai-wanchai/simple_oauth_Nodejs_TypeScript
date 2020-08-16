import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import * as _ from 'lodash'
import AuthManager from '../manager/AuthManager'
import { ErrorHandle, IError, CommonError } from '../common/errorHandle';
import { UserAttributes } from '../@types/users'
import { IToken } from '../@types/token';
import { IClient } from '../@types/client';
import AjaxResult from '../utils/AjaxResult';

export async function registerClient(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult()
  try {
    const data: IClient = req.body
    const payload: IToken = res.locals.payload
    const client: any = await manager.client.addClient(data.clientName!, payload.sub, data.description!)
    result.data = _.pick(client, ['clientId', 'clientSecret', 'clientName', 'description'] as any)
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}
export async function updateClient(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult()
  try {
    const userPayload: IToken = res.locals.payload
    const client: IClient = res.locals.client
    const data: IClient = req.body
    data.updatedBy = userPayload.sub
    result.data = await manager.client.updateClient(client.clientId, data)
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}
export async function deleteClient(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult()
  try {
    const client: IClient = res.locals.client
    result.data = await manager.client.deleteClient(client.clientId!)
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}
export async function getClientInformation(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult()
  try {
    result.data = res.locals.client
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}
export async function getAllClient(req: Request, res: Response, next: NextFunction) {
  const result = new AjaxResult()
  try {
    result.data = await manager.client.getAllClient()
  } catch (error) {
    const err = new ErrorHandle(error)
    result.setHandleError(err)
  }
  next([result, result.statusCode])
}