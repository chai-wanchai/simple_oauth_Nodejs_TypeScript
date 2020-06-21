import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import { ErrorHandle } from '../common/errorHandle'
import * as _ from 'lodash'
import { IClient } from '../types/client';
import { IToken } from '../types/token';
export async function registerUser(req: Request, res: Response, next: NextFunction) {
	try {
		let dataUser = req.body
		dataUser = manager.auth.encryptData(dataUser)
		const user: any = await manager.user.createUser(dataUser)
		const result = _.pick(user, ['id', 'email', 'uid', 'roleId'] as any)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}
export async function registerClient(req: Request, res: Response, next: NextFunction) {
	try {
		const data: IClient = req.body
		const payload: IToken = res.locals.payload
		const client: any = await manager.client.addClient(data.clientName!, payload.sub, data.description!)
		const result = _.pick(client, ['clientId', 'clientSecret', 'clientName', 'description'] as any)
		res.json(result)
	} catch (error) {
		const err = new ErrorHandle(error)
		err.sendErrorResponse(res)
	}
}