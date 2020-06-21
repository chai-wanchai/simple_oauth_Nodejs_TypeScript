import { Response, Request, NextFunction } from 'express'
import manager from '../manager'
import { ErrorHandle } from '../common/errorHandle'
import { IRole } from '../types/role';
import * as _ from 'lodash'
import { IToken } from '../types/token'
export async function addRole(req: Request, res: Response, next: NextFunction) {
  try {
    const payload: IToken = res.locals.payload
    let data = req.body as IRole
    const result: any = await manager.role.createRole(
      data.roleCode!, data.roleName!, data.description, payload.sub, payload.client_id)
    if (result[1]) {
      res.status(201).json(result[0])
    } else {
      res.status(200).json(result[0])
    }
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}
// export async function addPermission(req: Request, res: Response, next: NextFunction) {
//   try {
//     const payload: IToken = res.locals.payload
//     let data = req.body as IPermission
//     const result: any = await manager.role.createPermission(
//       data.permissionCode!, data.permissionName!, data.description, payload.sub, payload.client_id)
//     if (result[1]) {
//       res.status(201).json(result[0])
//     } else {
//       res.status(200).json(result[0])
//     }
//   } catch (error) {
//     const err = new ErrorHandle(error)
//     err.sendErrorResponse(res)
//   }
// }
// export async function addRolePermission(req: Request, res: Response, next: NextFunction) {
//   try {
//     const data = req.body as IRolePermission
//     const result: any = await manager.role.createRolePermission(data.roleCode!, data.permissionCode!)
//     res.json(result)
//   } catch (error) {
//     const err = new ErrorHandle(error)
//     err.sendErrorResponse(res)
//   }
// }
export async function addClientRole(req: Request, res: Response, next: NextFunction) {
  try {
    const payload: IToken = res.locals.payload
    const data = req.body as IRole
    const result: any = await manager.role.createRole(data.roleCode!, data.roleName!, data.description, payload.sub)
    res.json(result)
  } catch (error) {
    const err = new ErrorHandle(error)
    err.sendErrorResponse(res)
  }
}