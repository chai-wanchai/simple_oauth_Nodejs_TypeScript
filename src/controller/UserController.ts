import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import { ErrorHandle } from '../common/errorHandle'
import { IRole } from '../@types/role';
import * as _ from 'lodash'
import { IToken } from '../@types/token'
import Middelware from '../manager/Middleware'
import AjaxResult from '../utils/AjaxResult';
export async function registerUser(req: Request, res: Response, next: NextFunction) {
	const result = new AjaxResult()
	try {
		let dataUser = req.body
		dataUser = manager.auth.encryptData(dataUser)
		const user: any = await manager.user.createUser(dataUser)
		result.data = _.pick(user, ['id', 'email', 'uid', 'roleId'] as any)
	} catch (error) {
		const err = new ErrorHandle(error)
		result.setHandleError(err)
	}
	next([result, result.statusCode])
}
export async function getUser(req: Request, res: Response, next: NextFunction) {
	const result = new AjaxResult()
	try {
		let { email } = req.body
		let userInfo = null
		if (!email) {
			const payload = Middelware.getUserPayload(req)
			userInfo = await manager.user.findUserById(parseInt(payload.sub, 10))
		} else {
			userInfo = await manager.user.findUserByUsername(email)
		}
		result.data = userInfo
	} catch (error) {
		const err = new ErrorHandle(error)
		result.setHandleError(err)
	}
	next([result, result.statusCode])
}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
	const result = new AjaxResult()
	try {
		let { user_id } = req.params
		result.data = await manager.user.updateUserById(parseInt(user_id, 10), req.body)
	} catch (error) {
		const err = new ErrorHandle(error)
		result.setHandleError(err)
	}
	next([result, result.statusCode])
}
export async function listUser(req: Request, res: Response, next: NextFunction) {
	const result = new AjaxResult()
	try {
		result.data = await manager.user.getAllUser()
	} catch (error) {
		const err = new ErrorHandle(error)
		result.setHandleError(err)
	}
	next([result, result.statusCode])
}